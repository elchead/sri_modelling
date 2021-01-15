#include "person.h"

std::ostream& operator<<(std::ostream& os, const Person& p){
    const auto pos = p.get_position();
    os << static_cast<int>(p.state) << "," << pos[0] << "," << pos[1] << "\n";
    return os;
}

Person::Person(Eigen::Vector2d p, double step_size) : position(p), velocity(), step_size_(step_size), state(State::Susceptible)
{
}

const Eigen::Vector2d& Person::get_position() const
{
    return position;
}

std::string Person::get_state_string() const
{
    switch (state)
    {
    case State::Infectious:
        return "infectious";
    case State::Recovered:
        return "recovered";
    case State::Susceptible:
        return "susceptible";
    default:
        return "unknown";
    }
}

void Person::move(double dx, double dy, bool change_position)
{
    // Position new_pos(position_.x + dx, position_.y + dy);
    if (change_position)
    {
        position[0] = dx;
        position[1] = dy;
    }
}

// std::ostream &operator<<(std::ostream &output, const Person &p)
// {
//     const auto pos = p.get_position();
//     output
//         << "Person at : (" << pos.x << " " << pos.y << ") is currently " << p.get_state_string();
//     return output;
// }