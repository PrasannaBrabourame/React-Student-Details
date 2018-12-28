# Scenario

The hypothetical application that you are going to develop is meant for Admin Staff to enter new Students along with their basic information (Name, Nationality, Date of Birth) as well family information (like parents and siblings). Once an Admin Staff submits the application, he/she cannot edit the information and all fields should appear as disabled for him/her. 

This information then needs to be approved by the Registrar. The Registrar can edit any information of a student along with adding/editing or even deleting family members.

Both Admins and Registrars see a table where they can see registered students and can click to view their details in a Modal.

There is no login into the system, the role of the user can be changed via a drop down from the top menu on the landing page.


# Screens

Landing Page
The landing page contains a table that lists all students. The rows can be clicked and opens the Modal with Student Details (see below). This screen also contains a Add New Student Button that will be used to create a New Student. It also contains a dropdown on the top of the page that allows the user to switch roles

# Student Modal
This is a Modal that will contain 2 Sections. 
Section 1 is Basic Information that contains the First Name, Last Name, Date of Birth (Date Picker) and Nationality (drop down).
Section 2 is Family Information that will contain a section for each family member. Each Family Member Section contains the following fields: Name, Relationship (DropDown with 3 choices Parent, Sibling, Spouse), Nationality (DropDown). This section also contains the Add Family Member button which is used to add new Family Members (the user can add as many family members he wishes), as well as a Delete Family Member used to delete each Family Member. Also, all fields of the Family Member can be edited by the Registrar.

All Fields in the Modal should be disabled, when the Admin opens the students that are already submitted.

All Changes should be submitted only when the user taps submit and should be discarded when the user taps cancel.
