# **To-Do**

---

## **Current**

* **FRONTEND** // Implement print formatting
* **FRONTEND** // Fix ordering of Question Types and Question Type Groups (after Mike has finished question type revamp)
* **FRONTEND** // [Write full suite of tests for current components](https://www.robinwieruch.de/react-testing-tutorial/)

---

## **Backlog**

#### **_FRONTEND_**

* **Implementation**
  * UI
    * DiagnosticForm
      * Figure out decimal issue:
        * Decimals should be exact, or fill up the whole space. I.e. ".66" and ".67"(?) are wrong, but ".666" and ".667" and "0.67"(?) are right.
      * Format page elements
      * Figure out mobile keyboard implementation
        * [React-device-detect](https://www.npmjs.com/package/react-device-detect)
    * Video archive
      * Research YouTube API for potential ways of automatically generating playlist based on channel content
  * Redux
    * Implement full integration
      * [Explore react-connected-router](https://github.com/supasate/connected-react-router)
  * Data Fetching
    * [Read this article for more info](https://www.robinwieruch.de/react-fetching-data/)
  * Organization
    * Clean up inline styles where possible
  * Accessibility
    * Research standards and implement
* **Testing**
  * UI
    * [Visual regression tests](https://www.robinwieruch.de/visual-regression-testing-react-storybook/)
  * Unit Tests
    * Unit test all custom functions
  * Integration Tests
    * Integration tests for all current components
  * End-to-End Tests
    * ???
* **Bug Fixes**

#### **_BACKEND_**

* **Implementation**
  * Models
    * Authorization
  * Views
    * Authorization
  * Serializers
    * Authorization
* **Testing**
  * Views
    * Authorization
    * SAT Score Conversion
      * New tests for generic ListAPIView
* **Bug Fixes**

#### **_DEPLOYMENT_**

* [Desploy your react-django-app on heroku](https://medium.com/@nicholaskajoh/deploy-your-react-django-app-on-heroku-335af9dab8a3)

---

## **Bucket**

* **FRONTEND**
  * Bug report button

---

## **Completed**

* 2018.06.28 - **BACKEND** // Transition to PostgreSQL
* 2018.06.28 - **BACKEND** // Create simple model and DRF API to get a sense of client-server data flow and API request calls (using TDD)
* 2018.06.29 - **BACKEND** // Implement Test -> Question -> Answer models (and any other relevant models needed the diagnostic flow)
* 2018.06.29 - **BACKEND** // Implement Test -> Question -> Answer -> (...etc) serializers + views using TDD
* 2018.06.29 - **BACKEND** // **Working API up and running**
* 2018.06.30 - **FRONTEND** // [Integrate Redux store and test ONE piece of data flow](https://egghead.io/courses/getting-started-with-redux)
* 2018.07.01 - **FRONTEND** // Integrate Redux into one part of DiagnosticForm flow (TestSelector)
* 2018.07.03 - **FRONTEND** // Implement simple loading_test Redux tag
* 2018.07.03 - **BACKEND** // Write Conversion Chart Test -> Model -> Serializer -> View
* 2018.07.03 - **FRONTEND** // Fully integrate and implement Redux within current DiagnosticForm component set
* 2018.07.04 - **BACKEND** // [Implement first-pass user authorization](http://v1k45.com/blog/modern-django-part-4-adding-authentication-to-react-spa-using-drf/)
* 2018.07.04 - **FRONTEND** // Write a diagnostic_in_progress Redux flag
* 2018.07.06 - **BACKEND** // Write Question Type Group Test -> Model -> Serializer -> View
* 2018.07.10 - **FRONTEND** // Implement SAT Results with formatting
* 2018.07.11 - **FRONTEND** // Integrate Redux with React-Router
