#include "person.h"

std::ostream& operator<<(std::ostream& os, const Person& p){
    const auto pos = p.get_position();
    os << static_cast<int>(p.state) << "," << pos.x << "," << pos.y << "\n";
    return os;
}

Person::Person(Position p, double step_size) : position_(p), step_size_(step_size), state(State::Susceptible)
{
}

Position Person::get_position() const
{
    return position_;
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

Position Person::move(double dx, double dy, bool change_position)
{
    Position new_pos(position_.x + dx, position_.y + dy);
    if (change_position)
    {
        position_ = new_pos;
    }
    return new_pos;
}

// std::ostream &operator<<(std::ostream &output, const Person &p)
// {
//     const auto pos = p.get_position();
//     output
//         << "Person at : (" << pos.x << " " << pos.y << ") is currently " << p.get_state_string();
//     return output;
// }