## 1. Run Gprof

GCC: `-O0 -pg`

Configuration:

```
{
  "population_size": "1000",
  "nbr_timesteps": "100",
  "dt_days": "0.01",
  "infection_duration_days": "10",
  "dimension_x": "1",
  "dimension_y": "1",
  "moving_speed": "1",
  "infection_probability_day": "0.5",
  "infection_radius": "0.5"
}
```

running with 1 Population.

The first profiling revealed that the random number generator `random.get_double()` is very expensive:

```
Each sample counts as 0.01 seconds.
  %   cumulative   self              self     total
 time   seconds   seconds    calls   s/call   s/call  name
 52.51      1.89     1.89   321828     0.00     0.00  std::mersenne_twister_engine<unsigned long, 32ul, 624ul, 397ul, 31ul, 2567483615ul, 11ul, 4294967295ul, 7ul, 2636928640ul, 15ul, 4022730752ul, 18ul, 1812433253ul>::_M_gen_rand()
 18.06      2.54     0.65   321828     0.00     0.00  std::mersenne_twister_engine<unsigned long, 32ul, 624ul, 397ul, 31ul, 2567483615ul, 11ul, 4294967295ul, 7ul, 2636928640ul, 15ul, 4022730752ul, 18ul, 1812433253ul>::seed(unsigned long)
  7.50      2.81     0.27 200820672     0.00     0.00  std::__detail::_Mod<unsigned long, 4294967296ul, 1ul, 0ul, true, true>::__calc(unsigned long)
  4.58      2.98     0.17 200498844     0.00     0.00  std::__detail::_Mod<unsigned long, 624ul, 1ul, 0ul, true, true>::__calc(unsigned long)
  3.89      3.12     0.14 200820672     0.00     0.00  unsigned long std::__detail::__mod<unsigned long, 4294967296ul, 1ul, 0ul>(unsigned long)
  2.22      3.20     0.08 200498844     0.00     0.00  unsigned long std::__detail::__mod<unsigned long, 624ul, 1ul, 0ul>(unsigned long)
  1.67      3.26     0.06                             std::allocator_traits<std::allocator<jute::jValue> >::deallocate(std::allocator<jute::jValue>&, jute::jValue*, unsigned long)
  0.83      3.29     0.03                             __gnu_cxx::new_allocator<jute::jValue>::deallocate(jute::jValue*, unsigned long))
```

Consequently, the function was replaced with the simple `rand()`, which seeds the generator only once.

```
Each sample counts as 0.01 seconds.
  %   cumulative   self              self     total
 time   seconds   seconds    calls  ms/call  ms/call  name
  7.69      0.02     0.02  3199586     0.00     0.00  Eigen::internal::evaluator<Eigen::PlainObjectBase<Eigen::Matrix<double, 2, 1, 0, 2, 1> > >::evaluator(Eigen::PlainObjectBase<Eigen::Matrix<double, 2, 1, 0, 2, 1> > const&)
  7.69      0.04     0.02   330904     0.00     0.00  Random::get_double(double, double) const
  3.85      0.05     0.01  4899579     0.00     0.00  Eigen::EigenBase<Eigen::Matrix<double, 2, 1, 0, 2, 1> >::derived() const
  3.85      0.06     0.01  4692351     0.00     0.00  Eigen::DenseStorage<double, 2, 2, 1, 0>::cols()
  3.85      0.07     0.01  3199586     0.00     0.00  Eigen::internal::evaluator_base<Eigen::Matrix<double, 2, 1, 0, 2, 1> >::~evaluator_base()
  3.85      0.08     0.01  3199586     0.00     0.00  Eigen::internal::evaluator<Eigen::PlainObjectBase<Eigen::Matrix<double, 2, 1, 0, 2, 1> > >::~evaluator()
  3.85      0.09     0.01   697286     0.00     0.00  Eigen::internal::variable_if_dynamic<long, 2>::variable_if_dynamic(long)
  3.85      0.10     0.01   697286     0.00     0.00  double __vector(2) const Eigen::internal::scalar_constant_op<double>::packetOp<double __vector(2)>() const
  3.85      0.11     0.01   495379     0.00     0.00  Eigen::CwiseBinaryOp<Eigen::internal::scalar_product_op<double, double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::CwiseNullaryOp<Eigen::internal::scalar_constant_op<double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const>::rows() const
  3.85      0.12     0.01   400400     0.00     0.00  std::__array_traits<double, 2ul>::_S_ref(double const (&) [2], unsigned long)
  3.85      0.13     0.01   298593     0.00     0.00  Eigen::internal::evaluator<Eigen::CwiseBinaryOp<Eigen::internal::scalar_product_op<double, double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::CwiseNullaryOp<Eigen::internal::scalar_constant_op<double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const> const>::evaluator(Eigen::CwiseBinaryOp<Eigen::internal::scalar_product_op<double, double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::CwiseNullaryOp<Eigen::internal::scalar_constant_op<double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const> const&)
  3.85      0.14     0.01   298593     0.00     0.00  Eigen::internal::enable_if<true, Eigen::CwiseBinaryOp<Eigen::internal::scalar_product_op<double, Eigen::internal::promote_scalar_arg<double, double, Eigen::internal::has_ReturnType<Eigen::ScalarBinaryOpTraits<double, double, Eigen::internal::scalar_product_op<double, double> > >::value>::type>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::internal::plain_constant_type<Eigen::Matrix<double, 2, 1, 0, 2, 1>, Eigen::internal::promote_scalar_arg<double, double, Eigen::internal::has_ReturnType<Eigen::ScalarBinaryOpTraits<double, double, Eigen::internal::scalar_product_op<double, double> > >::value>::type>::type const> const>::type Eigen::MatrixBase<Eigen::Matrix<double, 2, 1, 0, 2, 1> >::operator*<double>(double const&) const
  3.85      0.15     0.01   200200     0.00     0.00  Eigen::CwiseUnaryOp<Eigen::internal::scalar_abs2_op<double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const>::rows() const
  3.85      0.16     0.01   200200     0.00     0.00  Eigen::CwiseBinaryOp<Eigen::internal::scalar_sum_op<double, double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::CwiseBinaryOp<Eigen::internal::scalar_product_op<double, double>, Eigen::CwiseNullaryOp<Eigen::internal::scalar_constant_op<double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const>::functor() const
  3.85      0.17     0.01   200200     0.00     0.00  Eigen::CwiseBinaryOp<Eigen::internal::scalar_product_op<double, double>, Eigen::CwiseNullaryOp<Eigen::internal::scalar_constant_op<double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const, Eigen::Matrix<double, 2, 1, 0, 2, 1> const>::lhs() const
  3.85      0.18     0.01   200200     0.00     0.00  double __vector(2) const Eigen::internal::scalar_sum_op<double, double>::packetOp<double __vector(2)>(double __vector(2) const&, double __vector(2) const&) const
  3.85      0.19     0.01   200200     0.00     0.00  double __vector(2) Eigen::internal::binary_evaluator<Eigen::CwiseBinaryOp<Eigen::internal::scalar_difference_op<double, double>, Eigen::CwiseBinaryOp<Eigen::internal::scalar_sum_op<double, double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::CwiseBinaryOp<Eigen::internal::scalar_product_op<double, double>, Eigen::CwiseNullaryOp<Eigen::internal::scalar_constant_op<double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const> const, Eigen::Matrix<double, 2, 1, 0, 2, 1> const>, Eigen::internal::IndexBased, Eigen::internal::IndexBased, double, double>::packet<16, double __vector(2)>(long, long) const
  3.85      0.20     0.01   100100     0.00     0.00  void Eigen::internal::call_assignment_no_alias<Eigen::Matrix<double, 2, 1, 0, 2, 1>, Eigen::CwiseBinaryOp<Eigen::internal::scalar_product_op<double, double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::CwiseNullaryOp<Eigen::internal::scalar_constant_op<double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const>, Eigen::internal::add_assign_op<double, double> >(Eigen::Matrix<double, 2, 1, 0, 2, 1>&, Eigen::CwiseBinaryOp<Eigen::internal::scalar_product_op<double, double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::CwiseNullaryOp<Eigen::internal::scalar_constant_op<double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const> const&, Eigen::internal::add_assign_op<double, double> const&)
  3.85      0.21     0.01   100100     0.00     0.00  Eigen::internal::copy_using_evaluator_innervec_CompleteUnrolling<Eigen::internal::generic_dense_assignment_kernel<Eigen::internal::evaluator<Eigen::Matrix<double, 2, 1, 0, 2, 1> >, Eigen::internal::evaluator<Eigen::CwiseBinaryOp<Eigen::internal::scalar_product_op<double, double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::CwiseNullaryOp<Eigen::internal::scalar_constant_op<double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const> >, Eigen::internal::add_assign_op<double, double>, 0>, 0, 2>::run(Eigen::internal::generic_dense_assignment_kernel<Eigen::internal::evaluator<Eigen::Matrix<double, 2, 1, 0, 2, 1> >, Eigen::internal::evaluator<Eigen::CwiseBinaryOp<Eigen::internal::scalar_product_op<double, double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::CwiseNullaryOp<Eigen::internal::scalar_constant_op<double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const> >, Eigen::internal::add_assign_op<double, double>, 0>&)
  3.85      0.22     0.01   100000     0.00     0.00  double __vector(2) Eigen::internal::unary_evaluator<Eigen::CwiseUnaryOp<Eigen::internal::scalar_square_op<double>, Eigen::ArrayWrapper<Eigen::CwiseBinaryOp<Eigen::internal::scalar_difference_op<double, double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const> const>, Eigen::internal::IndexBased, double>::packet<16, double __vector(2)>(long, long) const
  3.85      0.23     0.01   100000     0.00     0.00  Eigen::ArrayBase<Eigen::ArrayWrapper<Eigen::CwiseBinaryOp<Eigen::internal::scalar_difference_op<double, double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const> >::square() const
  3.85      0.24     0.01      100     0.10     2.18  Population::move())
```

This increased the performance by a few magnitudes and made the runtime very small.

## 2. Run Gprof

In the next run, the population size was increased to **10'000** and run on **2 populations** to get insights into the scaling.
A look at the call graph revealed that `updateStatuses()` is a bottleneck.
Herein, `getDistSquare()` is most expensive because it calculates the distance between any two persons within the population.

```
               0.00   15.86     200/200         Simulation::start() [2]
[3]     99.7    0.00   15.86     200         Population::nextTimestep() [3]
                0.90    9.36     200/200         Population::updateStatuses() [4]
                0.20    5.00     200/200         Population::move() [8]
                0.02    0.38     200/200         Population::writeData() const [55]
-----------------------------------------------
                0.90    9.36     200/200         Population::nextTimestep() [3]
[4]     64.5    0.90    9.36     200         Population::updateStatuses() [4]
                0.35    8.14 43725582/43725582     getDistSquare(Eigen::Matrix<double, 2, 1, 0, 2, 1> const&, Eigen::Matrix<double, 2, 1, 0, 2, 1> const&) [5]
                0.01    0.29     400/400         getGroup(State, std::vector<Person, std::allocator<Person> >&) [77]
```

```
Each sample counts as 0.01 seconds.
  %   cumulative   self              self     total
 time   seconds   seconds    calls   s/call   s/call  name
  5.66      0.90     0.90      200     0.00     0.05  Population::updateStatuses()
  2.95      1.37     0.47 43725582     0.00     0.00  Eigen::DenseBase<Eigen::CwiseUnaryOp<Eigen::internal::scalar_square_op<double>, Eigen::ArrayWrapper<Eigen::CwiseBinaryOp<Eigen::internal::scalar_difference_op<double, double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const> const> >::sum() const
  2.20      1.72     0.35 43725582     0.00     0.00  getDistSquare(Eigen::Matrix<double, 2, 1, 0, 2, 1> const&, Eigen::Matrix<double, 2, 1, 0, 2, 1> const&)
  1.89      2.02     0.30 43725582     0.00     0.00  Eigen::internal::redux_impl<Eigen::internal::scalar_sum_op<double, double>, Eigen::internal::redux_evaluator<Eigen::CwiseUnaryOp<Eigen::internal::scalar_square_op<double>, Eigen::ArrayWrapper<Eigen::CwiseBinaryOp<Eigen::internal::scalar_difference_op<double, double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const> const> >, 3, 2>::run(Eigen::internal::redux_evaluator<Eigen::CwiseUnaryOp<Eigen::internal::scalar_square_op<double>, Eigen::ArrayWrapper<Eigen::CwiseBinaryOp<Eigen::internal::scalar_difference_op<double, double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const> const> > const&, Eigen::internal::scalar_sum_op<double, double> const&)
  1.89      2.32     0.30 43725582     0.00     0.00  double Eigen::DenseBase<Eigen::CwiseUnaryOp<Eigen::internal::scalar_square_op<double>, Eigen::ArrayWrapper<Eigen::CwiseBinaryOp<Eigen::internal::scalar_difference_op<double, double>, Eigen::Matrix<double, 2, 1, 0, 2, 1> const, Eigen::Matrix<double, 2, 1, 0, 2, 1> const> const> const> >::redux<Eigen::internal::scalar_sum_op<double, double> >(Eigen::internal::scalar_sum_op<double, double> const&) const
  1.82      2.61     0.29 113341049     0.00     0.00  double __vector(2) Eigen::internal::pload<double __vector(2)>(Eigen::internal::unpacket_traits<double __vector(2)>::type const*)
  1.76      2.89     0.28 147231738     0.00     0.00  Eigen::internal::evaluator<Eigen::PlainObjectBase<Eigen::Matrix<double, 2, 1, 0, 2, 1> > >::evaluator(Eigen::PlainObjectBase<Eigen::Matrix<double, 2, 1, 0, 2, 1> > const&)
  1.51      3.13     0.24 260121875     0.00     0.00  Eigen::DenseStorage<double, 2, 2, 1, 0>::cols()
  1.45      3.36     0.23 147231738     0.00     0.00  Eigen::internal::evaluator_base<Eigen::Matrix<double, 2, 1, 0, 2, 1> >::evaluator_base()
  1.26      3.56     0.20      202     0.00     0.00  std::__cxx11::to_string(unsigned long)
  1.26      3.76     0.20      200     0.00     0.03  Population::move()
  1.19      3.95     0.19 260121875     0.00     0.00  Eigen::PlainObjectBase<Eigen::Matrix<double, 2, 1, 0, 2, 1> >::rows() const)
```

From this, it is visible that there are no very apparent bottlenecks anymore.
As expected, the `move()` operation is most expensive, which is where all calculations take place.
