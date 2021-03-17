const { createConnection } = require('mysql2')
const { prompt } = require('inquirer')
require('console.table')

const db = createConnection('mysql://root:rootroot@localhost/employees_db')



//add department
const AddDepartment = () => {
  
    prompt([
      {
        name: "name",
        type: "input",
        message: "Enter the department name",
      },
    ])
    .then(departments => {
      db.query('INSERT INTO departments SET ?', departments, err => {
        if (err) { console.log(err) }
        console.log('departments Created!')
        mainMenu()
      })
    })
    .catch(err => console.log(err))
}

//add role
const AddRoles = () => {
  
    prompt([
      {
        name: "title",
        type: "input",
        message: "Enter the title of the new role",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter the salary of the new role",
      },
      {
        name: "department_id",
        type: "input",
        message: "Enter the department Id of the new role.",
      },
    ])
    .then(roles => {
      db.query('INSERT INTO roles SET ?', roles, err => {
        if (err) { console.log(err) }
        console.log('Roles Created!')
        mainMenu()
      })
    })
    .catch(err => console.log(err))
}

//addEmployee function definition
const AddEmployee = () => {
  
    prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter the first name of the new employee",
      },
      {
        name: "last_name",
        type: "input",
        message: "Enter the last name of the new employee",
      },
      {
        name: "role_id",
        type: "input",
        message: "Enter the role ID of the employee",
        // choices: pull in roles data
      },
      {
        name: "manager_id",
        type: "input",
        message: "Enter the id (number) of the manager",
        // choices: pull in manager names
      },
    ])
    .then(employees => {
      db.query('INSERT INTO employees SET ?', employees, err => {
        if (err) { console.log(err) }
        console.log('employees Created!')
        mainMenu()
      })
    })
    .catch(err => console.log(err))
}


//ViewDepartment
const ViewDepartment = () => {
  db.query('SELECT * FROM departments', (err, departments) => {
    if (err) { console.log(err) }
    console.table(departments)
    mainMenu()
  })
}

//ViewRoles
const ViewRoles = () => {
  db.query('SELECT * FROM roles', (err, roles) => {
    if (err) { console.log(err) }
    console.table(roles)
    mainMenu()
  })
}

//ViewEmployee
const ViewEmployee = () => {
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) { console.log(err) }
    console.table(employees)
    mainMenu()
  })
}

//DeleteDepartment
const DeleteDepartment = () => {
  db.query('SELECT * FROM departments', (err, departments) => {
    prompt({
      type: 'list',
      name: 'id',
      message: 'Select a departments to Delete:',
      choices: departments.map(departments => ({
        name: `${departments.name}`,
        value: departments.id
      }))
    })
      .then(res => {
        db.query('DELETE FROM departments WHERE ?', res, err => {
          if (err) { console.log(err) }
          console.log('departments Deleted!')
          mainMenu()
        })
      })
  })
}

//DeleteDepartment  //error
const DeleteRoles = () => {
  db.query('SELECT * FROM roles', (err, roles) => {
    prompt({
      type: 'list',
      name: 'id',
      message: 'Select a roles to Delete:',
      choices: roles.map(roles => ({
        name: `${roles.title}`,
        value: roles.id
      }))
    })
      .then(res => {
        db.query('DELETE FROM roles WHERE ?', res, err => {
          if (err) { console.log(err) }
          console.log('roles Deleted!')
          mainMenu()
        })
      })
  })
}

//Working Perfect
const DeleteEmployees = () => {
  db.query('SELECT * FROM employees', (err, employees) => {
    prompt({
      type: 'list',
      name: 'id',
      message: 'Select a employees to Delete:',
      choices: employees.map(employees => ({
        name: `${employees.first_name} ${employees.last_name}`,
        value: employees.id
      }))
    })
      .then(res => {
        db.query('DELETE FROM employees WHERE ?', res, err => {
          if (err) { console.log(err) }
          console.log('employees Deleted!')
          mainMenu()
        })
      })
  })
}

//single update
const UpdateEmployeeManager = () => {
  db.query('SELECT * FROM employees', (err, employees) => {
    prompt([
      {
        type: 'list',
        name: 'id',
        message: 'Select a employees to Update the Manager id:',
        choices: employees.map(employees => ({
          name: `${employees.first_name} ${employees.manager_id}`,
          value: employees.id
        }))
      },
      {
        type: 'number',
        name: 'manager_id',
        message: 'Set a New Manager for the Employee:'
      }
    ])
      .then(({ id, manager_id }) => {
        db.query('UPDATE employees SET ? WHERE ?', [{ manager_id }, { id }], err => {
          if (err) { console.log(err) }
          console.log('Employee Manager Updated!')
          mainMenu()
        })
      })
  })
}

//ViewEmployeesbyManager

const ViewEmployeesbyManager = () => {
  db.query(`SELECT employees.id, employees.first_name, employees.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees
    
   
     LEFT JOIN employees manager ON manager.id = employees.manager_id;
     `,

  (err, roles) => {
    if (err) { console.log(err) }
    console.table(roles)
    mainMenu()
  })
}

//TotalSalarybyDepartment
const TotalSalarybyDepartment = () => {
  db.query(`SELECT sum(roles.salary) as combinedSalary, departments.name AS 'department' FROM employees
         LEFT JOIN roles ON employees.role_id = roles.id
         LEFT JOIN departments ON roles.department_id = departments.id
          group by departments.name
     `,

    (err, roles) => {
      if (err) { console.log(err) }
      console.table(roles)
      mainMenu()
    })
}




const mainMenu = () => {
  prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'Add Department',
      'Add Roles',
      'Add Employee',
      'View Department',
      'View Roles',
      'View Employee',
      'Update Employee Manager',
      'View Employees by Manager',
      'Delete Department',
      'Delete Roles',
      'Delete Employees',
      'Total Salary by Department'

    ]
  })
    .then(({ action }) => {
      switch (action) {
        case 'Add Department':
          AddDepartment()
          break
        case 'Add Roles':
          AddRoles()
          break
        case 'Add Employee':
          AddEmployee()
          break
        case 'View Department':
          ViewDepartment()
          break
        case 'View Roles':
          ViewRoles()
          break
        case 'View Employee':
          ViewEmployee()
          break
        case 'Update Employee Manager':   
          UpdateEmployeeManager()
          break
        case 'View Employees by Manager':  //  //
          ViewEmployeesbyManager()
          break
        case 'Delete Department':      //
          DeleteDepartment()
          break 
        case 'Delete Roles':          //
          DeleteRoles()
          break
        case 'Delete Employees':
          DeleteEmployees()
          break
        case 'Total Salary by Department':  //  //
          TotalSalarybyDepartment()
          break

        
      }
    })
    .catch(err => console.log(err))
}

mainMenu()
