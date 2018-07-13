# **Wright Minded**

### Version: 0.1.0

---

# _Notes_

---

---

# _Reference_

---

## **> C**

### **CSS**

**Media Widths**

```
@media screen and (min-width: 1088px) {
}

@media screen and (max-width: 1087px) {
}

@media screen and (max-width: 768px) {
}

@media screen and (max-width: 475px) {
}
```

---

## **> P**

### **Postgres**

**Deployment**

Run `psql` in Terminal.

Enter `CREATE USER name;`

Enter `ALTER USER name CREATEDB;`

Enter `CREATE DATABASE database_name OWNER name;`

Connect to your new database by changing `DATABASES` in `your_app/your_app/settings.py` to:

```
DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.postgresql',
          'NAME': 'database_name',
          'USER': 'name',
          'PASSWORD': '',
          'HOST': 'localhost',
          'PORT': '',
      }
  }
```

1.  Run `python manage.py migrate`
1.  Run `python manage.py createsuperuser` 🤙

---

## **> R**

### **`react-router`**

#### Passing props to a component rendered by `react-router`

Instead of using component, use the render prop. render accepts a functional component and that function won’t get unnecessarily remounted like with component. That function will also receive all the same props that component would receive. So you can take those and pass those along to the rendred component.

```
<Route
  path='/dashboard'
  render={(props) => <Dashboard {...props} isAuthed={true} />}
/>
```

So to recap, if you need to pass a prop to a component being rendered by React Router, instead of using Routes component prop, use its render prop passing it an inline function then pass along the arguments to the element you’re creating.

---

## **> T**

### **Testing**

#### React

**Setup** // Make sure you have the following in your `package.json`:

```
// package.json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test:unit": "mocha --require babel-core/register --require test/helpers.js --require test/dom.js 'src/**/*.spec.js'",
    "test:unit:watch": "npm run test:unit -- --watch",
    "test:snapshot": "jest --config ./test/jest.config.json",
    "test:snapshot:watch": "npm run test:snapshot -- --watch",
    "eject": "react-scripts eject",
    "postinstall": "npm run build"
  },
...
"devDependencies": {
    "babel-jest": "^23.2.0",
    "babel-plugin-css-modules-transform": "^1.6.1",
    "babel-plugin-transform-decorators-legacy": "^1.3.5",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "chai": "^4.1.2",
    "enzyme": "^3.3.0",
    "enzyme-adapter-react-16": "^1.1.1",
    "jest": "^23.2.0",
    "jsdom": "^11.11.0",
    "mocha": "^5.2.0",
    "react-test-renderer": "^16.4.1"
  }
```

And create a `.babelrc` file with the following:

```
// .babelrc
{
  "plugins": [
    "transform-object-rest-spread",
    [
      "css-modules-transform",
      {
        "extensions": [ ".css" ]
      }
    ],
  ],
  "presets": ["env", "react", "es2015"]
}
```

And create a `jest.config.json` file in your `/test/` folder and add the following to it:

```
{
  "testRegex": "((\\.|/*.)(snapshot))\\.js?$",
  "rootDir": ".."
}
```

**Mocha** // https://github.com/mochajs/mocha // In React testing, there needs to be an entity which is responsible to run all of our tests in a certain framework. This entity will be Mocha which is a popular test runner in React applications. In contrast, another popular test runner is Karma which is popular for testing Angular applications.

**Chai** // https://github.com/chaijs/chai // There also needs to be an entity which can be used to make assertions. Someone has to able to say: “Expect X to be equal to Y”. This entity will be Chai in our testing setup. So let’s install it on the command line as well.

**jsdom** // https://github.com/jsdom/jsdom // Last but not least, React components need some kind of artificial browser environment, because they render HTML in the browser’s DOM. Since the tests are not executed in a real browser, you need to setup the minimal environment for the component tests yourself. That’s why you need to install jsdom on the command line as dev dependency as well. Jsdom makes sure that you can create this artificial browser environment.

**Enzyme** // Enzyme makes it effortless to test React components with unit and integration tests.

* `shallow()` is the simplest form of rendering a component with Enzyme. It only renders the component but not the content of components which are children to this component. It makes it possible to test the component in isolation. Thus it can be used perfectly for unit tests of React components.

---

## **> U**

### **User Auth**

**See:** [Using `django-rest-knox` for easy user authentication](http://v1k45.com/blog/modern-django-part-4-adding-authentication-to-react-spa-using-drf/) & [`django-rest-knox` docs](https://github.com/James1345/django-rest-knox/blob/master/docs/auth.md)
