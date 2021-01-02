#pragma once
#include <cstddef>

struct BoxDimension
{
    BoxDimension() = default;
    BoxDimension(double x_dim, double y_dim) : x(x_dim), y(y_dim) {}
    bool isInside(const Position &position) { return abs(x)*0.95 > position.x && abs(y)*0.95 > position.y; };
    double x, y;
};

struct Configuration
{
    Configuration() = default;
    size_t population_size;
    size_t nbr_timesteps;
    double dt;
    double infection_duration;
    BoxDimension dimensions;
    double moving_speed;
    double infection_probability;
    double infection_radius;
};