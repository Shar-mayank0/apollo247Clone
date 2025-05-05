import mongoose , {Schema, Document} from "mongoose";

interface Time{
    hours: number;
    minutes: number;
}

export interface IDoctor extends Document {
    name: string;
    email: string;
    modeOfConsult: string[];
    specialization: string[];
    experience: number;
    fees: number;
    languages: string[];
    facility: string[];
    likes: number;
    location: string;
    onlineAvailabilityStart: Time;
    onlineAvailabilityEnd: Time;
    offlineAvailabilityStart: Time;
    offlineAvailabilityEnd: Time;
}

const doctorSchema = new Schema<IDoctor>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    modeOfConsult: { type: [String], required: true },
    specialization: { type: [String], required: true },
    experience: { type: Number, required: true },
    fees: { type: Number, required: true },
    languages: { type: [String], required: true },
    facility: { type: [String], required: true },
    likes: { type: Number, default: 0 },
    location: { type: String, required: true },
    onlineAvailabilityStart:{type:{hours:Number,minutes:Number}},
    offlineAvailabilityStart:{type:{hours:Number,minutes:Number}},
    onlineAvailabilityEnd:{type:{hours:Number,minutes:Number}},
    offlineAvailabilityEnd:{type:{hours:Number,minutes:Number}}
});

const DoctorModel = mongoose.models.Docter as mongoose.Model<IDoctor> || mongoose.model<IDoctor>("Doctor", doctorSchema);

export default DoctorModel;