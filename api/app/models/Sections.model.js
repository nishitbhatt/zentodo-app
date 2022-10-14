import mongoose from "mongoose"

const SectionsSchema = new mongoose.Schema({
    name: String
});


// eslint-disable-next-line new-cap
const SectionModel = new mongoose.model("sections", SectionsSchema);

export default SectionModel