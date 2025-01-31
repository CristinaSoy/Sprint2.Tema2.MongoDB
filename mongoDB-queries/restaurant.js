
//1 Mostrar documents en la col·lecció Restaurants.
db.restaurant.find();

//2. Mostrar el restaurant_id, name, borough i cuisine de tots els documents en la col·lecció Restaurants.
db.restaurant.find({},{restaurant_id:1, name:1, borough:1, cuisine:1});

//3. Mostrar el restaurant_id, name, borough i cuisine, però excloent el camp _id
db.restaurant.find({},{_id:0, restaurant_id:1, name:1, borough:1, cuisine:1});

//4. Mostrar restaurant_id, name, borough i zip code, però excloent el camp _id 
db.restaurant.find({},{_id:0,restaurant_id:1, name:1, borough:1, "address.zipcode":1});

//5. Mostrar tots els restaurants que estan en el Bronx.
db.restaurant.find({borough: 'Bronx'});

//6. Mostrar els primers 5 restaurants que estan en el Bronx.
db.restaurant.find({borough: 'Bronx'}).limit(5);

//7. Mostrar els 5 restaurants després de saltar els primers 5 que siguin del Bronx.
db.restaurant.find({borough: 'Bronx'}).skip(5).limit(5);

//8. Trobar els restaurants que tenen algun score més gran de 90.
db.restaurant.find({"grades.score": {$gt : 90}});

//9. Trobar els restaurants que tenen un score més gran que 80 però menys que 100.
db.restaurant.find({
    grades : { 
        $elemMatch: { 
            score : { $gt : 80, $lt : 100}
        }
    }
})

//10. Trobar els restaurants situats en una longitud inferior a -95.754168.
db.restaurant.find({"address.coord.0": {$lt:-95.754168}});

//11. Trobar els restaurants que no cuinen menjar 'American ' i tenen algun score superior a 70 
// i latitud inferior a -65.754168.
db.restaurant.find({
    $nor : [{cuisine: 'American '}],
    $and : [
        { "grades.score": {$gt : 70} },
        { "address.coord.0": {$lt:-65.754168} }
    ]
});

//12. Idem anterior sense utilitzar operador $and.
db.restaurant.find({
    "grades.score": {$gt : 70},
    "address.coord.0": {$lt:-65.754168},
    $nor : [{cuisine: 'American '}]
    });

// mismo query con orden cambiado. Ambos funcionan
db.restaurant.find({
    $nor : [{cuisine: 'American '}],
    "grades.score": {$gt : 70},
    "address.coord.0": {$lt:-65.754168}
});


//13. Trobar els restaurants que no preparen menjar 'American ', 
// tenen alguna nota 'A' i no pertanyen a Brooklyn. 
//S'ha de mostrar el document segons la cuisine en ordre descendent.
db.restaurant.find(
    {
        $nor : [
            {cuisine: 'American '},
            {borough: "Brooklyn"}
        ],
        "grades.grade" : {$eq : "A"}
    },
    {borough: 1}
)
.sort({cuisine: -1});

//14. Trobar el restaurant_id, name, borough i cuisine per restaurants 
// amb 'Wil' en les tres primeres lletres en el seu nom.
db.restaurant.find(
    {
        name: {$regex: "^Wil"}
    },
    {
        restaurant_id: 1,
        name: 1,
        borough: 1,
        cuisine: 1
    }
);

//15. Trobar el restaurant_id, name, borough i cuisine per a aquells restaurants 
// amb "ces" en las ultimas letras del nombre
db.restaurant.find(
    {
        name: {$regex: "ces$"}
    },
    {
        restaurant_id: 1,
        name : 1,
        borough : 1,
        cuisine : 1
    }
)

//16 Trobar el restaurant_id, name, borough i cuisine per restaurants 
// amb 'Reg' en qualsevol lloc del seu nom.
db.restaurant.find(
    {
        name: {$regex: "Reg"}
    },
    {
        restaurant_id: 1,
        name : 1,
        borough : 1,
        cuisine : 1
    })

//17. Trobar els restaurants del Bronx que preparen plats Americans o xinesos.
db.restaurant.find(
    {
        borough : "Bronx",
        cuisine: {$in : ["American ", "Chinese"]}
    }
);

//18. Trobar el restaurant_id, name, borough i cuisine que pertanyen a Staten Island, Queens, Bronx o Brooklyn.
db.restaurant.find(
    {
        borough : {$in : ["Staten Island", "Queens", "Bronx", "Brooklyn"]}
    },
    {
        _id: 0, restaurant_id :1 , name: 1, borough: 1, cuisine : 1
    }
);
//19. Trobar el restaurant_id, name, borough i cuisine que NO pertanyen a Staten Island, Queens, Bronx o Brooklyn.
db.restaurant.find(
    {
        borough : {$nin : ["Staten Island", "Queens", "Bronx", "Brooklyn"]}
    },
    {
        _id : 0, restaurant_id :1 , name: 1, borough: 1, cuisine : 1
    }
);
//20. Trobar el restaurant_id, name, borough i cuisine amb nota menor que 10.
db.restaurant.find(
    { 
        "grades.score" : { $not : {$gte : 10}} //interpreto l'enunciat com que "no tingui cap nota superior a 10"
    },
    {
        _id: 0, restaurant_id: 1, name : 1, borough : 1, cuisine: 1, grades : 1
    }    
);

//21. Trobar el restaurant_id, name, borough i cuisine per restaurants que preparen marisc ('seafood') excepte si són 'American ', 'Chinese' o el name del restaurant comença amb lletres 'Wil'.
db.restaurant.find(
    {
      cuisine : "Seafood",     //NOTA: si la cuisinie es "Seafood" no pot ser "American" o "Chinese"
      name : { $not : {$regex: "^Wil"}}
    },
    {
        _id: 0, restaurant_id: 1, name: 1, borough:1 ,cuisine: 1
    }
);

//22. Trobar el restaurant_id, name i grades per restaurants amb un grade de "A" i un score d'11 
// amb un ISODate "2014-08-11T00:00:00Z".
db.restaurant.find(
    {
        grades: {
            $elemMatch : { 
                grade : "A", 
                score : 11
                date : ISODate("2014-08-11T00:00:00Z")
            }
        }
    },
    {
        _id: 0, restaurant_id: 1 , name: 1, grades:1
    }
)

//23.  trobar el restaurant_id, name i grades per a aquells restaurants on el 
// 2n element de l'array de graus conté un grade de "A" i un score 9 amb un ISODate "2014-08-11T00:00:00Z".
db.restaurant.find(
    {
        "grades.1.grade" : "A",
        "grades.1.score" : 9,
        "grades.1.date" : ISODate("2014-08-11T00:00:00Z")      
    },
    {_id: 0, restaurant_id: 1, name : 1, grades: 1 }
)

//24. Trobar el restaurant_id, name, adreça i ubicació geogràfica per restaurants on el segon element de l'array coord conté un valor entre 42 i 52.
db.restaurant.find(
    { "address.coord.1" : {$lt : 52, $gte : 42} },
    { _id: 0, restaurant_id : 1, name: 1, address: 1 }
);

//25. organitzar els restaurants per nom en ordre ascendent.
db.restaurant.find().sort({name : 1});

//26.organitzar els restaurants per nom en ordre descendent.
db.restaurant.find().sort({name : -1});

//27. organitzar els restaurants pel nom de la cuisine en ordre ascendent i pel barri en ordre descendent.
db.restaurant.find().sort({cuisine : 1}, {borough: -1});

//28. saber si les direccions contenen el carrer.
db.restaurant.find({ "address.street" : { $exists: true}} )

//29.Seleccionar documents a restaurants amb valors de coord de tipus Double.
db.restaurant.find({ "address.coord" : { $type : "double"} } )

//30. Seleccionar el restaurant_id, name i grade pels restaurants que retornen 0 com a residu després de dividir algun dels seus score per 7.
db.restaurant.find(
    {"grades.score"  : { $mod : [7, 0]}},
    {_id: 0, restaurant_id: 1, name: 1, grades: 1 }
)

//31. Trobar el name de restaurant, borough, longitud, latitud i cuisine dels restaurants amb 'mon' en algun lloc del seu name.
db.restaurant.find(
    { name : { $regex : "mon", $options : "i"} },
    { _id: 0, name : 1, borough:1, "address.coord": 1, cuisine:1 }
);

//32. Trobar el name de restaurant, borough, longitud, latitud i cuisine dels restaurants amb 'Mad' com a tres inicials del name.
db.restaurant.find(
     { name : {$regex : "^Mad"} },
     { _id: 0, name: 1, borough: 1, "address.coord": 1, cuisine : 1 }
);