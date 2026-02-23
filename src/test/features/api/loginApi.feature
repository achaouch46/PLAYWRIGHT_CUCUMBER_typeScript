Feature: Users API

@api @all
  Scenario: Get list of users
    When I call the GET user API 2
    Then the response should contain the user data

    