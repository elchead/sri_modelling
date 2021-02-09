#pragma once
#include <random>
#include <cstdlib>
class Random
{
public:
    double get_double(double min=0,double max=1) const{
    return min+ (max-min)*(double)rand() / (RAND_MAX);
}
};