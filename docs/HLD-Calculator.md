# High Level Design - Calculator System

## Context

Currently, our users complaint about the lack of confidence when making basic math operations like addition, subtraction, multiplication and division and based on these and others needs we are going to construct a new calculator portal. This portal should have the following.

### Requirements:

- The calculator should have a browser-based user interface (ie it can be opened using a web
  browser)
- The calculator should have a number pad with digits 0-9 and decimal point
- The calculator should have buttons for addition, subtraction, multiplication, and division
- The calculator should have a display that shows the input and the result of the calculation
- The calculator should follow the order of operations (PEMDAS)
- The calculator should have a way to sign up with a username and password
- The calculator should have a way to log in with username and password
- The calculator should have a backend service to handle authentication
- The calculator should be usable with or without authentication
- The calculator should have a navigation bar or panel which displays the user’s authentication status
- The calculator should have the following features:
  - Memory functions (M+, M-, MR, MC)
  - Percentage function (%)
  - Square root function (√)
  - Exponential function (^)
  - History function

## Decision

Based on those features we are proposing the following solution:

### HLD (High Level Design)

## Consequences

This section describes the resulting context, after applying the decision. All consequences should be listed here, not just the "positive" ones. A particular decision may have positive, negative, and neutral consequences, but all of them affect the team and project in the future.

##### References

- [About ADR's](https://github.com/joelparkerhenderson/architecture-decision-record)
