USE employees_db;

INSERT INTO department (name)
VALUES ("IT"),
       ("Finance"),
       ("Software Development"),
       ("Legal"),
       ("Sales");
       
INSERT INTO position (title, salary, department_id)
VALUES ("Support Lead",50000,1),
       ("Support Desk",40000,1),
       ("Accounts Manager",80000,2),
       ("Accountant",60000,2),
       ("Web Lead",180000,3),
       ("Software Engineer",150000,3),
       ("Web Developer",120000,3),
       ("Project Manager",200000,4),
       ("Secretary",60000,4),
       ("Account Executive",120000,5),
       ("Professional Consultant",110000,5),
       ("CEO",300000,2);

INSERT INTO employee (first_name, last_name, position_id, manager_id)
VALUES ("Christy","Brewer",1,NULL),
       ("Cheryl","Hearth",3,NULL),
       ("Richie","Stone",5,NULL),
       ("Holly","Dennis",8,NULL),
       ("Charley","Smith",10,NULL),
       ("Stephany","Stephens",12,NULL),
       ("Tina","Holland",2,1),
       ("Rich","Brown",2,1),
       ("Charlotte","Brimming",3,2),
       ("Katey","Manson",4,2),
       ("Terry","Copper",5,3),
       ("Jen","Tremone",6,3),
       ("Jena","Peters",7,3),
       ("Sherry","Timmons",8,3),
       ("Sarah","Nichols",9,4),
       ("Hannah","Kettle",10,5),
       ("Mary","McKennon",11,5);
       