#pragma once
#include <cstddef>
#include <array>

struct BoxDimension
{
    BoxDimension() = default;
    BoxDimension(double x_dim, double y_dim) : x(x_dim), y(y_dim), dl_bound({-x_dim,-y_dim}), ur_bound({x_dim,y_dim}) {}
    bool isInside(const Position &position) { return abs(x)*0.95 > abs(position.x) && abs(y)*0.95 > abs(position.y); };
    double x, y;
    std::array<double,2> dl_bound, ur_bound;
};

struct Configuration
{
    Configuration() = default;
    size_t population_size;
    size_t nbr_timesteps;
    double dt;
    double infection_duration;
    BoxDimension dimensions;
    double infection_probability;
    double infection_radius;
    // person movement
    double max_speed;
    double wander_step_size = 1;
    double wander_step_duration = 1;
    double social_distance_factor = 1;
    double gravity_strength = 1;
    double wall_buffer = 1;
};