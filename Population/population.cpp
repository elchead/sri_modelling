#include "population.h"

double Random::get_double(double min, double max) const
{
    std::random_device rd;  //Will be used to obtain a seed for the random number engine
    std::mt19937 gen(rd()); //Standard mersenne_twister_engine seeded with rd()
    std::uniform_real_distribution<> unif_gen(min, max);
    return unif_gen(gen);
}

Population::Population(size_t size) : random_(), config_(), S_(size), I_(size), R_(size)
{
    config_.dimensions.x = 1.;
    config_.dimensions.y = 1.;
    config_.population_size = size;
    config_.nbr_timesteps = 10;
    config_.infection_probability = 1.;
    config_.infection_radius = .5;

    for (size_t i = 0; i < size; ++i)
    {
        double rnd_x = config_.dimensions.x * random_.get_double();
        double rnd_y = config_.dimensions.y * random_.get_double();
        const auto pos = Position(rnd_x, rnd_y);
        persons_.emplace_back(Person(pos));
    }
    auto p = Person(Position(0,0));
    p.set_state(State::Infectious);
    persons_.push_back(p);
}

void Population::startSimulation()
{
    for (size_t i = 1; i < config_.nbr_timesteps + 1; ++i)
    {
        std::cout << "Output: "
                  << i << std::endl;
        nextTimestep();
        std::cout << std::endl;
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

double getDistSquare(const Position& a,const Position& b){
    return pow(a.x - b.x, 2) + pow(a.y - b.y, 2);
}

void Population::updateStatuses() {
    auto s_group = getGroup(State::Susceptible,persons_);
    auto i_group = getGroup(State::Infectious,persons_);
    for(auto s_person: s_group){
       for(const auto i_person: i_group){
           const auto dist = getDistSquare(s_person->get_position(), i_person->get_position());
           if (dist < pow(config_.infection_radius,2) && random_.get_double() < config_.infection_probability) {
                   s_person->set_state(State::Infectious);
               }
       }
    }
}

void Population::move() {
    for (auto person : persons_)
    {
        bool valid = false;
        double rnd_x, rnd_y;
        while (!valid)
        {
            rnd_x = random_.get_double();
            rnd_y = random_.get_double();
            const auto new_pos = person.move(rnd_x, rnd_y, false);
            valid = config_.dimensions.isInside(new_pos);
        }
        person.move(rnd_x, rnd_y, true);
        std::cout << person << std::endl;
    }
}

void Population::nextTimestep()
{
    updateStatuses();
    move();
}