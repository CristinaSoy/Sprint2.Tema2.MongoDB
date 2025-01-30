
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
db.restaurant.find({
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
db.restaurant.find({
    name: {$regex: "^Wil"}
},{
    restaurant_id: 1,
    name: 1,
    borough: 1,
    cuisine: 1
});

//15. Trobar el restaurant_id, name, borough i cuisine per a aquells restaurants 
// amb "ces" en las ultimas letras del nombre
db.restaurant.find({
    name: {$regex: "ces$"}
},{
    restaurant_id: 1,
    name : 1,
    borough : 1,
    cuisine : 1
})

//16 Trobar el restaurant_id, name, borough i cuisine per restaurants 
// amb 'Reg' en qualsevol lloc del seu nom.
db.restaurant.find({
    name: {$regex: "Reg"}
},{
    restaurant_id: 1,
    name : 1,
    borough : 1,
    cuisine : 1
})

//17. Trobar els restaurants del Bronx que preparen plats Americans o xinesos.
//18. Trobar el restaurant_id, name, borough i cuisine que pertanyen a Staten Island, Queens, Bronx o Brooklyn.
//19. Trobar el restaurant_id, name, borough i cuisine que NO pertanyen a Staten Island, Queens, Bronx o Brooklyn.
//20. Trobar el restaurant_id, name, borough i cuisine amb nota menor que 10.

//21. Trobar el restaurant_id, name, borough i cuisine per restaurants que preparen marisc ('seafood') excepte si són 'American ', 'Chinese' o el name del restaurant comença amb lletres 'Wil'.

//22. Trobar el restaurant_id, name i grades per restaurants amb un grade de "A" i un score d'11 amb un ISODate "2014-08-11T00:00:00Z".
//23. Trobar el restaurant_id, name i grades per restaurants on el 2n element de l'array de graus conté un grade de "A" i un score 9 amb un ISODate "2014-08-11T00:00:00Z".
//24. Trobar el restaurant_id, name, adreça i ubicació geogràfica per restaurants on el segon element de l'array coord conté un valor entre 42 i 52.
//25. organitzar els restaurants per nom en ordre ascendent.
//26.organitzar els restaurants per nom en ordre descendent.
//27. organitzar els restaurants pel nom de la cuisine en ordre ascendent i pel barri en ordre descendent.
//28. saber si les direccions contenen el carrer.
//29.Seleccionar documents a restaurants amb valors de coord de tipus Double.
//30. Seleccionar el restaurant_id, name i grade per a aquells restaurants que retornen 0 com a residu després de dividir algun dels seus score per 7.
//31. Trobar el name de restaurant, borough, longitud, latitud i cuisine dels restaurants amb 'mon' en algun lloc del seu name.
//32. Trobar el name de restaurant, borough, longitud, latitud i cuisine dels restaurants amb 'Mad' com a tres inicials del name.