Feature: Users API

@api @all
  Scenario: Get list of users
    When I call the GET users API
    Then the response status should be 200
    And the response should contain users