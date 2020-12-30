#pragma once
#include <cstddef>

struct BoxDimension
{
    BoxDimension() = default;
    BoxDimension(double x_dim, double y_dim) : x(x_dim), y(y_dim) {}
    bool isInside(const Position &position) { return x > position.x && y > position.y; };
    double x, y;
};

struct Configuration
{
    Configuration() = default;
    size_t population_size;
    size_t nbr_timesteps;
    BoxDimension dimensions;
    double infection_probability;
    double infection_radius;
};