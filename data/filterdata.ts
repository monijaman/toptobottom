const prices = [
    {
        "_id": 0,
        "name": "Any",
        "array": [0]
    },
    {
        "_id": 1,
        "name": "৳0 to ৳200",
        "array": [0, 199]
    },
    {
        "_id": 2,
        "name": "৳200 to ৳400",
        "array": [200, 400]
    },
    {
        "_id": 3,
        "name": "৳400 to ৳700",
        "array": [400, 700]
    },
    {
        "_id": 4,
        "name": "৳1200 to ৳2000",
        "array": [1200, 2000]
    },
    {
        "_id": 5,
        "name": "৳2000 to ৳3000",
        "array": [2000, 3000]
    },
    {
        "_id": 5,
        "name": "৳3000 to ৳6000",
        "array": [3000, 6000]
    },
    {
        "_id": 5,
        "name": "৳6000 to ৳9000",
        "array": [6000, 9000]
    },
    {
        "_id": 5,
        "name": "৳9000 to ৳12000",
        "array": [9000, 12000]
    },
    {
        "_id": 5,
        "name": "More Than ৳12000",
        "array": [12000, 60000]
    }
]



const categories = [
    {
        "_id": "All",
        "name": "All"
    },
    {
        "_id": "organic",
        "name": "Organic Products"
    },
    {
        "_id": "computer",
        "name": "Computer Equipment"
    },
    {
        "_id": "shirts",
        "name": "Shirts"
    }, {
        "_id": "pants",
        "name": "Pants"
    },
    {
        "_id": "tshirt",
        "name": "Tshirt"
    },
    {
        "_id": "gown",
        "name": "Night Gown"
    },
    {
        "_id": "sports",
        "name": "Sports Wear"
    },
    {
        "_id": "shoes",
        "name": "Shoes"
    },
    {
        "_id": "watch",
        "name": "Watch"
    }
]

const availablecolors = [
    {
        "name": "Red",
        "code": "#FF0000"
    },
    {
        "name": "Cyan",
        "code": "#00FFFF"
    },
    {
        "name": "Blue",
        "code": "#00008B"
    },
    {
        "name": "Yellow",
        "code": "#fdffc9"
    },
    {
        "name": "Lime",
        "code": "#00FF00"
    },
  
    {
        "name": "Magenta",
        "code": "#FF00FF"
    },
    {
        "name": "Pink",
        "code": "#FFC0CB"
    },
    {
        "name": "White",
        "code": "#FFFFFF"
    },
    {
        "name": "Black",
        "code": "#000000"
    },
    {
        "name": "Orange",
        "code": "#FFA500"
    },
    {
        "name": "Green",
        "code": "#008000"
    },
    {
        "name": "Brown",
        "code": "#A52A2A"
    }
]

const sizes = [
    {
        "name": "100GM",
        "code": "100 GM"
    },
    {
        "name": "250GM",
        "code": "250 GM"
    },
    {
        "name": "500GM",
        "code": "500 GM"
    },
    {
        "name": "1000GM",
        "code": "1 KG"
    },
    {
        "name": "2KG",
        "code": "2 KG"
    },{
        "name": "5KG",
        "code": "5 KG"
    },{
        "name": "10KG",
        "code": "10 KG"
    },
]


const measurements = [
    {
        "name": "S",
        "code": "Small"
    },
    {
        "name": "M",
        "code": "Medium"
    },
    {
        "name": "L",
        "code": "Large"
    },
    {
        "name": "XL",
        "code": "Extra Large"
    },
    {
        "name": "XXL",
        "code": "Double Extra Large"
    }
]

const materials = [
    {
        "name": "cottom",
        "code": "Cotton"
    },
    {
        "name": "wolven",
        "code": "Wolven"
    },
    {
        "name": "plastic",
        "code": "Plastic"
    }
]

const brands = [
    {
        "name": "Moucak",
    }
]
 

export {
    prices,
    categories,
    availablecolors,
    brands,
    sizes,
    materials,
    measurements
}