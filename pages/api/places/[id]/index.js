import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.findById(id);
    return response.status(200).json(places);
  } else if (request.method === "PUT") {
    const updatedPlace = request.body;
    await Place.findByIdAndUpdate(id, updatedPlace);

    response.status(200).json({
      status: "Place successfully updated, you can see now the new Content",
    });
  } else if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);

    response
      .status(200)
      .json({ message: "Place successfully deleted, you cool guy" });
  }
}

/* In pages/api/index.js, replace the places variable imported from lib/db.js with a GET request from your database.
Do the same in pages/api/[id]/index.js for the details page. 

In pages/places/[id].index.js, write the deletePlace function to start a DELETE request.
Write the DELETE API route in pages/api/places/[id]/index.js.

*/
