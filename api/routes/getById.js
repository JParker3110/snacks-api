// // import our Supabase instance
// // const supabase = require("../../supabaseInstance");

// // import our Supabase instance
// const supabase = require("../../supabaseInstance");

// app.use('/snacks', apiKeyMiddleware, snacksRouter);


// const getById = async (request, response, next) => {
//   try {
//     const res = await supabase.get(`/snacks?id=eq.${request.params.id}`);

//     //Error Handling
//     if (!res.data.length) {
//       return response.status(404).json({ message: "Snacks does not exist!" });
//     }

//     // send our snacks object
//     response.json(res.data[0]);
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = getById;
 