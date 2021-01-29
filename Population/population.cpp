#include "population.h"

double Random::get_double(double min, double max) const
{
    std::random_device rd;  //Will be used to obtain a seed for the random number engine
    std::mt19937 gen(rd()); //Standard mersenne_twister_engine seeded with rd()
    std::uniform_real_distribution<> unif_gen(min, max);
    return unif_gen(gen);
}

Population::Population(Configuration config) : random_(), config_(config), S_(config.population_size), I_(config.population_size), R_(config.population_size)
{
    const auto max_x = config_.dimensions.x*0.95;
    const auto max_y = config_.dimensions.y*0.95; 
    for (size_t i = 0; i < config.population_size; ++i)
    {
        double rnd_x = config_.dimensions.x * random_.get_double(-max_x, max_x);
        double rnd_y = config_.dimensions.y * random_.get_double(-max_y, max_y);
        const auto pos = Eigen::Vector2d(rnd_x, rnd_y);
        persons_.emplace_back(pos,config_.dt);
    }
    auto p = Person(Eigen::Vector2d(0.1,0.1),config_.dt);
    p.set_state(State::Infectious);
    persons_.push_back(p);
}

void Population::startSimulation()
{
    if (std::filesystem::is_directory("CSV") || !std::filesystem::exists("CSV")) std::filesystem::create_directory("CSV"); 
    // auto csv = CSV("data.csv");
    std::cout << "Storing csv ouput in subfolder of: " << std::filesystem::current_path() <<std::endl;
    for (size_t i = 1; i < config_.nbr_timesteps + 1; ++i)
    {
        std::cout << "Output: "
                  << i << std::endl;
        nextTimestep();
        std::ofstream writer("./CSV/data_" + std::to_string(i) + ".csv");
        writer << "state,pos_x,pos_y\n";
        for (const auto& person : persons_)
            writer << person;
        //csv.exporter(persons_);
    }
}

auto getGroup(State state,std::vector<Person>& persons){
    std::vector<Person *> p;
    for (auto& person : persons)
    {
        if(person.state == state){
            p.push_back(&person);
        }
    }
    return p;
    //return persons | std::ranges::views::filter([state](const Person& a) { return a.state == state; });
}

double getDistSquare(const Eigen::Vector2d& a,const Eigen::Vector2d& b){
    return (a-b).array().square().sum(); //return pow(a.x - b.x, 2) + pow(a.y - b.y, 2);
}

void Population::updateStatuses() {
    // get new infected people
    auto s_group = getGroup(State::Susceptible,persons_);
    auto i_group = getGroup(State::Infectious,persons_);
    for(auto* s_person: s_group){
       for(const auto* i_person: i_group){
           const auto dist = getDistSquare(s_person->get_position(), i_person->get_position());
           if (dist < pow(config_.infection_radius,2) && random_.get_double() < config_.infection_probability) {
                   s_person->set_state(State::Infectious);
                   s_person->infection_start_time = time_;
               }
       }
    }

    // get newly recovered people
   for(auto* i_person: i_group){
       if(time_ - i_person->infection_start_time
           > config_.infection_duration)
           i_person->set_state(State::Recovered);
   }
}

Eigen::Vector2d random_unit_vector(double rnd){
    return Eigen::Vector2d(cos(2 * M_PI * rnd), sin(2 * M_PI * rnd));
}

void Population::move() {
    for (auto& person : persons_)
    {
        auto total_force = Eigen::Vector2d();
        // set random movement
        const auto randomSmallJerk = 0.001;
        const auto& pos = person.get_position();
        if(config_.wander_step_size != 0){
            const auto vec = random_unit_vector(random_.get_double());
            const auto gravity_well = pos +config_.wander_step_size * vec;
            const auto to_well = gravity_well - pos;
            const auto dist = to_well.norm();
            if (dist != 0)
                total_force += config_.gravity_strength * to_well / (pow(dist, 3));
        }
        // std::cout << "Gravity" << total_force[0] << "\t" << total_force[1] << std::endl;

        // Avoid walls
        auto wall_force = Eigen::Vector2d();
        for (size_t i = 0; i < 2; i++){
            const auto to_lower = pos[i] - config_.dimensions.dl_bound[i];
            const auto to_upper = config_.dimensions.ur_bound[i] - pos[i];
        
            // Bounce
            if(to_lower<0) {
                std::cout << "toLower" << to_lower << std::endl;
                person.velocity[i] = abs(person.velocity[i]);
                person.position[i] = config_.dimensions.dl_bound[i];
                std:: cout << person.position[0] << " " << person.position[1] << std::endl;
                std::cout << "outside, set" << i << " " << person.position[i] << std::endl;
            }
            if(to_upper<0) {
                person.velocity[i] = -abs(person.velocity[i]);
                person.position[i] = config_.dimensions.ur_bound[i];
            }
            if(to_lower != 0)
                wall_force[i] += std::max((-1 / config_.wall_buffer + 1 / to_lower),0.);
            if(to_upper != 0)
                wall_force[i] -= std::max((-1 / config_.wall_buffer + 1 / to_upper),0.);
        }
        
        // std::cout << "Wall force" << wall_force[0] << "\t" << wall_force[1] << std::endl;
        total_force += wall_force;

        // Apply force
        person.velocity += total_force * config_.dt;

        // Limit speed
        const auto speed = person.velocity.norm();
        if(speed > config_.max_speed) person.velocity =  person.velocity* config_.max_speed/speed;
        //std::cout << "Gravity" << person.velocity.norm() << person.velocity[0] << "\t" << person.velocity[1] << std::endl;
        const auto new_pos = pos + person.velocity * config_.dt;
        person.move(new_pos[0], new_pos[1]);
    }
}

void Population::nextTimestep()
{
    updateStatuses();
    move();
    time_ += config_.dt;
}