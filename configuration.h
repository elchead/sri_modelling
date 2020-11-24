#include <cstddef>

struct BoxDimension
{
    BoxDimension(double x_dim, double y_dim) : x(x_dim), y(y_dim) {}
    double x, y;
};

class Configuration
{
    size_t population_size_;
    size_t nbr_timesteps_;
    BoxDimension dimensions_;
    double infection_probability_;
    double infection_radius_;
};