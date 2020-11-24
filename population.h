#include <vector>
#include "person.h"

class Population
{
public:
    Population(size_t size);
    void nextTimestep(); // outputs SIR data

private:
    std::vector<Person> persons_;
};