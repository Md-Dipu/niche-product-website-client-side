const {
    insertBooking,
    findBookings,
    findBookingById
} = require("../services/bookingServices");
const parseQuery = require("../utils/parseQuery");

exports.postBooking = async (req, res) => {
    try {
        const result = await insertBooking(req.body);

        res.status(200).json({
            success: true,
            message: "Booking data inserted successfully",
            data: {
                insertedId: result._id
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Couldn't able to insert booking data",
            error: error.message
        });
    }
};

exports.getBookings = async (req, res) => {
    const { filters, queries } = parseQuery(req.query);

    try {
        const result = await findBookings(filters, queries);

        res.status(200).json({
            success: true,
            message: "Bookings data found successfully",
            data: result.users,
            count: result.count
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Couldn't able to find bookings data",
            error: error.message
        });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await findBookingById(req.params.id);

        res.status(200).json({
            success: true,
            message: "Booking data found successfully",
            data: booking
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Couldn't able to find booking data",
            error: error.message
        });
    }
};