#include "population.h"

Population::Population(Configuration config,size_t id) : id_(id), csv_folder_("CSV/Population" + std::to_string(id_)), random_(), config_(config)
{
    const auto max_x = config_.dimensions.x*0.95;
    const auto max_y = config_.dimensions.y*0.95;
    for (size_t i = 0; i < config.population_size; ++i)
    {
        double rnd_x = config_.dimensions.x * random_.get_double(-max_x, max_x);
        double rnd_y = config_.dimensions.y * random_.get_double(-max_y, max_y);
        const auto pos = Eigen::Vector2d();
        persons_.emplace_back(rnd_x, rnd_y,config_.dt);
    }
    const auto nbr_initial_infected = config.initial_infection_proportion * config.population_size;
    for (auto i = 0; i < nbr_initial_infected; ++i){
        persons_[i].set_state(State::Infectious);
    }
    //     auto p = Person(Eigen::Vector2d(0.1, 0.1), config_.dt);
    // p.set_state(State::Infectious);
    // persons_.push_back(p);

    // create csv output folder
    if (std::filesystem::is_directory("CSV") || !std::filesystem::exists("CSV")) std::filesystem::create_directory("CSV");
    if (std::filesystem::is_directory(csv_folder_) || !std::filesystem::exists(csv_folder_))
        std::filesystem::create_directory(csv_folder_);
}

void Population::startSimulation()
{
    std::cout << "Storing csv ouput in subfolder of: " << std::filesystem::current_path() <<std::endl;
    for (auto i = 0; i < config_.nbr_timesteps; ++i)
    {
        std::cout << "Output: "
                  << i << std::endl;
        nextTimestep();
    }
}

// write state information of persona to CSV
void Population::writeData() const {
    std::ofstream writer("./" + csv_folder_ + "/data_" + std::to_string(nbr_timesteps_) + ".csv");
        writer << "state,pos_x,pos_y\n";
        for (const auto& person : persons_)
            writer << person;
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
           if (random_.get_double() < config_.infection_probability && getDistSquare(s_person->get_position(), i_person->get_position()) <config_.infection_radius*config_.infection_radius) {
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
    writeData();
    updateStatuses();
    move();
    time_ += config_.dt;
    nbr_timesteps_++;
}

size_t Population::get_nbr_infected() const {
    size_t n = 0;
    for(const auto & person : persons_)
        if(person.state == State::Infectious)
            n++;
    return n;
}