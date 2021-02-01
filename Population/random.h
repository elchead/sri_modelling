#pragma once
#include <random>

class Random
{
public:
    double get_double(double min=0,double max=1) const{
    std::random_device rd;  //Will be used to obtain a seed for the random number engine
    std::mt19937 gen(rd()); //Standard mersenne_twister_engine seeded with rd()
    std::uniform_real_distribution<> unif_gen(min, max);
    return unif_gen(gen);
}
};