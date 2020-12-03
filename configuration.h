#include <cstddef>

struct BoxDimension
{
    BoxDimension(double x_dim, double y_dim) : x(x_dim), y(y_dim) {}
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