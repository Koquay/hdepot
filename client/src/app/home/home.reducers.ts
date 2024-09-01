import { createReducer, on } from "@ngrx/store";
const initialState = {
    heroCarouselImages: [
        "Screenshot%20from%202024-07-02%2010-32-18.png",
        "Screenshot%20from%202024-07-02%2010-35-42.png",
        "Screenshot%20from%202024-07-02%2010-35-31.png"
    ],
    topPickTabs: [
        {
            type: "All",
            href: "#tab-1",
            active: true
        },
        {
            type: "Refrigerators",
            href: "#tab-2",
            active: false
        },
        {
            type: "Ranges",
            href: "#tab-3",
            active: false
        },
        {
            type: "Washers & Dryers",
            href: "#tab-4",
            active: false
        },
        {
            type: "Patio Furniture",
            href: "#tab-5",
            active: false
        },
        {
            type: "Grills",
            href: "#tab-6",
            active: false
        },
        {
            type: "Bath",
            href: "#tab-7",
            active: false
        },
        {
            type: "Lawn & Garden",
            href: "#tab-8",
            active: false
        },
        {
            type: "Storage & Organization",
            href: "#tab-9",
            active: false
        },
        {
            type: "Furniture",
            href: "#tab-10",
            active: false
        },
        
    ],
    
    savings: 
        {
            heading: '4th of July Savings',
            items: [
                {
                    title: 'UP TO $850 OFF',
                    description: 'Select products with great savings...',
                    img: 'Screenshot%20from%202024-07-05%2012-29-10.png',                    
                },
                {
                    title: 'UP TO $850 OFF',
                    description: 'Select products with great savings...',
                    img: 'Screenshot%20from%202024-07-05%2012-29-23.png',                    
                },
                {
                    title: 'UP TO $850 OFF',
                    description: 'Select products with great savings...',
                    img: 'Screenshot%20from%202024-07-05%2012-29-36.png',                    
                },
                {
                    title: 'UP TO $850 OFF',
                    description: 'Select products with great savings...',
                    img: 'Screenshot%20from%202024-07-05%2012-29-52.png',                    
                },
                {
                    title: 'UP TO $850 OFF',
                    description: 'Select products with great savings...',
                    img: 'Screenshot%20from%202024-07-05%2012-52-43.png',                    
                },
                {
                    title: 'UP TO $850 OFF',
                    description: 'Select products with great savings...',
                    img: 'Screenshot%20from%202024-07-05%2012-52-54.png',                    
                },
                {
                    title: 'UP TO $850 OFF',
                    description: 'Select products with great savings...',
                    img: 'Screenshot%20from%202024-07-05%2012-53-23.png',                    
                },
                {
                    title: 'UP TO $850 OFF',
                    description: 'Select products with great savings...',
                    img: 'Screenshot%20from%202024-07-05%2012-53-40.png',                    
                },                
            ]
        },

    deals: 
    {
        heading: '4th of July Deals',
        items: [
            {
                title: 'UP TO $850 OFF',
                description: 'Select products with great savings...',
                img: 'Screenshot%20from%202024-07-05%2012-29-10.png',                    
            },
            {
                title: 'UP TO $850 OFF',
                description: 'Select products with great savings...',
                img: 'Screenshot%20from%202024-07-05%2012-29-23.png',                    
            },
            {
                title: 'UP TO $850 OFF',
                description: 'Select products with great savings...',
                img: 'Screenshot%20from%202024-07-05%2012-29-36.png',                    
            },
            {
                title: 'UP TO $850 OFF',
                description: 'Select products with great savings...',
                img: 'Screenshot%20from%202024-07-05%2012-29-52.png',                    
            },
            {
                title: 'UP TO $850 OFF',
                description: 'Select products with great savings...',
                img: 'Screenshot%20from%202024-07-05%2012-52-43.png',                    
            },
            {
                title: 'UP TO $850 OFF',
                description: 'Select products with great savings...',
                img: 'Screenshot%20from%202024-07-05%2012-52-54.png',                    
            },
            {
                title: 'UP TO $850 OFF',
                description: 'Select products with great savings...',
                img: 'Screenshot%20from%202024-07-05%2012-53-23.png',                    
            },
            {
                title: 'UP TO $850 OFF',
                description: 'Select products with great savings...',
                img: 'Screenshot%20from%202024-07-05%2012-53-40.png',                    
            },                
        ]
    },

    categories: {
        heading: 'Shop By Category',
        items: [
            {
                name: '4th of July Savings',
                icon: 'far fa-calendar-alt'
               },
               {
                name: 'Appliances',
                icon: 'fa fa-print primary-color'
               },
               {
                name: 'Blinds & Window Treatments',
                icon: 'far fa-window-restore'
               },
               {
                name: 'Bath & Faucets',
                icon: 'fa fa-bath'
               },
               {
                name: 'Building Materials',
                icon: 'far fa-building'
               },
               {
                name: 'Cleaning',
                icon: 'fa fa-spinner'
               },
               {
                name: 'Decor Furniture',
                icon: 'fa fa-object-group'
               },
               {
                name: 'Doors Windows',
                icon: 'far fa-window-restore'
               },
               {
                name: 'Electrical',
                icon: 'fa fa-signal primary-color'
               },
               {
                name: 'Flooring Area Rugs',
                icon: 'fa fa-american-sign-language-interpreting'
               },
               {
                name: 'Hardware',
                icon: 'fa fa-wrench'
               },
               {
                name: 'Heating Cooling',
                icon: 'fa fa-thermometer-quarter'
               },
               {
                name: 'Kitchen Placeholder',
                icon: 'fa fa-film'
               },
               {
                name: 'Kitchen',
                icon: 'far fa-calendar-alt'
               },
               {
                name: 'Lawn Garden',
                icon: 'fa fa-gears'
               },
               {
                name: 'Lighting &amp; Ceiling Fans',
                icon: 'far fa-lightbulb'
               },
                                                   
        ]

    },

    popularCategories: {
        heading: 'Popular Categories',
        items: [
            {
                name: 'Bug Zappers',
                
            },
            {
                name: 'Vinyl Plank Flooring',
                
            },
            {
                name: 'Siding',
                
            },
            {
                name: 'Deck Railings',
                
            },
            {
                name: 'Chain Link Fencing',
                
            },
            {
                name: 'Air Conditioners',
                
            },
            {
                name: 'Grass Seed',
                
            },
            {
                name: 'Table Saws',
                
            },
            {
                name: 'Evaporative Coolers',
                
            },
            {
                name: 'Paint Sprayers',
                
            }             
        ]

    }
    
}

export const HomeReducers = createReducer(
    initialState,

  );