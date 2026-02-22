Feature: User Authentication tests



@AA @all
  Scenario: Login should be success aa
   Given User navigates to the application
    And User click on the login link to connect
    And User enter the username as "Abdurrahmene"
    And User enter the password as "Test1234"
    When User click on the login button
    Then Login should be success


@BB @all
  Scenario: Login should be success bb
   Given User navigates to the application
    And User click on the login link to connect
    And User enter the username as "AbdurrahmeneXX"
    And User enter the password as "Test1234"
    When User click on the login button
    Then Login should be success
   
@CC @all
  Scenario: Login should be success cc
   Given User navigates to the application
    And User click on the login link to connect
    And User enter the username as "AbdurrahmeneXX"
    And User enter the password as "Test1234"
    When User click on the login button
    Then Login should be success

    @DD @all
  Scenario: Login should be success dd
   Given User navigates to the application
    And User click on the login link to connect
    And User enter the username as "AbdurrahmeneXX"
    And User enter the password as "Test1234"
    When User click on the login button
    Then Login should be success