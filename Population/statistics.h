#include <cstddef>
#include "enums.h"

class Statistics
{
public:
    Statistics(size_t population_size) : nbr_susceptible_(population_size), nbr_infectious_(0), nbr_recovered_(0){};
    void update(State old_state, State new_state);
    void getStats();

private:
    size_t nbr_susceptible_;
    size_t nbr_infectious_;
    size_t nbr_recovered_;
};