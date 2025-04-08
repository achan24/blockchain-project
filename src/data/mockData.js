// Mock data for development purposes

// Mock items available for rental
const items = [
    {
        id: 0,
        name: "Basketball",
        description: "Standard size basketball, perfect for pickup games on campus.",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=300",
        trustRequired: 0,
        deposit: "0.01 ETH",
        available: true,
        rentalPeriod: "3 days"
    },
    {
        id: 1,
        name: "Laptop Charger",
        description: "Universal laptop charger compatible with most modern laptops.",
        image: "https://images.unsplash.com/photo-1588599376442-3cbf9c67449e?auto=format&fit=crop&q=80&w=300",
        trustRequired: 1,
        deposit: "0.02 ETH",
        available: true,
        rentalPeriod: "7 days"
    },
    {
        id: 2,
        name: "DSLR Camera",
        description: "Canon EOS Rebel T7 DSLR Camera with 18-55mm lens. Perfect for photography projects.",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=300",
        trustRequired: 2,
        deposit: "0.1 ETH",
        available: true,
        rentalPeriod: "5 days"
    },
    {
        id: 3,
        name: "Gaming Console",
        description: "PlayStation 5 with two controllers and three popular games.",
        image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=300",
        trustRequired: 3,
        deposit: "0.2 ETH",
        available: true,
        rentalPeriod: "7 days"
    }
];

// Mock user data
const user = {
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    trustNFTs: 2,
    rentals: [
        {
            id: 1,
            itemName: "Basketball",
            rentalDate: "2025-03-15",
            returnDate: "2025-03-18",
            returned: true
        },
        {
            id: 2,
            itemName: "Laptop Charger",
            rentalDate: "2025-03-25",
            returnDate: "2025-04-01",
            returned: true
        },
        {
            id: 3,
            itemName: "DSLR Camera",
            rentalDate: "2025-04-05",
            returnDate: null,
            returned: false
        }
    ]
};

// Mock Trust NFTs
const nfts = [
    {
        id: "0x123456789abcdef1",
        level: 1,
        earnedFrom: "Basketball Rental",
        earnedDate: "2025-03-18"
    },
    {
        id: "0x123456789abcdef2",
        level: 2,
        earnedFrom: "Laptop Charger Rental",
        earnedDate: "2025-04-01"
    }
];

module.exports = {
    items,
    user,
    nfts
};
