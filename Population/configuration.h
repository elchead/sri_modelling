#pragma once
#include <cstddef>
#include <array>
#include "jute.h"
#include "person.h"
    
struct BoxDimension
{
    BoxDimension() = default;
    BoxDimension(double x_dim, double y_dim) : x(x_dim), y(y_dim), dl_bound({-x_dim,-y_dim}), ur_bound({x_dim,y_dim}) {}
    bool isInside(const Position &position) { return abs(x)*0.95 > abs(position.x) && abs(y)*0.95 > abs(position.y); };
    double x = 1;
    double y = 1;
    std::array<double, 2> dl_bound = {-x, -y};
    std::array<double, 2> ur_bound = {x,y};
};

struct Configuration
{
    Configuration() = default;
    size_t population_size;
    size_t nbr_timesteps = 1;
    double dt = 1;
    double infection_duration = 1;
    BoxDimension dimensions;
    double initial_infection_proportion = 0.1;
    double infection_probability = 1;
    double infection_radius = 1;
    // person movement
    double max_speed = 1;
    double wander_step_size = 1;
    double wander_step_duration = 1;
    double social_distance_factor = 1;
    double gravity_strength = 1;
    double wall_buffer = 1;
};

inline Configuration readConfig(const char* filepath="../config.json"){
    std::ifstream in("../config.json",std::ios::out);
    std::string str = "";
    std::string tmp;
    while (getline(in, tmp)) str += tmp;

    jute::jValue v = jute::parser::parse(str);
    Configuration config;
    config.population_size = v["population_size"].as_int();
    config.nbr_timesteps = v["nbr_timesteps"].as_int();
    config.dt = v["dt_days"].as_double();
    config.infection_duration = v["infection_duration_days"].as_double();
    config.dimensions = BoxDimension(v["dimension_x"].as_double(), v["dimension_x"].as_double());
    config.max_speed = v["moving_speed"].as_double();
    config.infection_probability = v["infection_probability_day"].as_double();
    config.infection_radius = v["infection_radius"].as_double();
    // ensure backwards compatibility
    try {
        if(v["initial_infection_proportion"].as_double() != 0.0)
            config.initial_infection_proportion = v["initial_infection_proportion"].as_double(); 
    }
    catch(...) {

    }
    return config;
    }