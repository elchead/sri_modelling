#include "population.h"

double Random::get_double() const
{
    std::random_device rd;  //Will be used to obtain a seed for the random number engine
    std::mt19937 gen(rd()); //Standard mersenne_twister_engine seeded with rd()
    std::uniform_real_distribution<> unif_gen(-0.5, 0.5);
    return unif_gen(gen);
}

Population::Population(size_t size) : random_(), config_()
{
    config_.dimensions.x = 2.;
    config_.dimensions.y = 3.;
    config_.population_size = size;
    config_.nbr_timesteps = 10;
    config_.infection_probability = .5;
    config_.infection_radius = 1.;

    for (size_t i = 0; i < size; ++i)
    {
        double rnd_x = config_.dimensions.x * random_.get_double();
        double rnd_y = config_.dimensions.y * random_.get_double();
        const auto pos = Position(rnd_x, rnd_y);
        persons_.emplace_back(Person(pos));
    }
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

void Population::nextTimestep()
{
    for (auto &person : persons_)
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