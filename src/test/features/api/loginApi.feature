Feature: Users API

@api @all
  Scenario: Get list of users
    When I call the GET users API 2
    Then the response should contain user

    