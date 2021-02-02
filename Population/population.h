#pragma once
#include <vector>
#include "configuration.h"
#include "person.h"
#include "random.h"
#include <chrono>
#include <Eigen/Core>
#include <cmath>
#include "csv-export.h"
#include <fstream>
#include <filesystem>
#include <math.h>
//#include <ranges>



class Population
{
public:
    Population(Configuration config,size_t id=0);
    void nextTimestep();    // outputs SIR data
    void startSimulation(); // timestep loop
    const std::vector<Person>& get_persons() const { return persons_; }
    Person removePerson() {
        Person last = persons_.back();
        persons_.pop_back();
        return last;
    }
    void addPerson(const Person& person) {
        persons_.push_back(person);
    }
    size_t id() const { return id_; }
    size_t size() const { return persons_.size(); }

private:
    void updateStatuses();
    void move();
    void writeData() const;

    std::vector<Person> persons_;
    Random random_;
    Configuration config_;
    double time_;
    size_t nbr_timesteps_ = 0;
    size_t id_;
    std::string csv_folder_;
    // Eigen::VectorXf S_;
    // Eigen::VectorXf I_;
    // Eigen::VectorXf R_;
};

std::ostream &operator<<(std::ostream &output, const Person &p);