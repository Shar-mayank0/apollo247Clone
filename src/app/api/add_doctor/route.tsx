import dbConnect from "@/lib/dbConnect";
import DoctorModel from "@/model/doctors_model";
import { NextRequest, NextResponse } from "next/server";


dbConnect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name,
                email,
                modeOfConsult, 
                specialization, 
                experience, 
                fees, 
                languages, 
                facility, 
                likes, 
                location, 
                onlineAvailability,
                offlineAvailability,
                onlineAvailabilityStart,
                onlineAvailabilityEnd,
                offlineAvailabilityStart,
                offlineAvailabilityEnd 
                } = reqBody;

                const doctor = await DoctorModel.findOne({ email });
                if (doctor) {
                    return NextResponse.json({ message: "Doctor already exists" }, { status: 400 });
                }
                const newDoctor = new DoctorModel({
                    name,
                    email,
                    modeOfConsult, 
                    specialization, 
                    experience, 
                    fees, 
                    languages, 
                    facility, 
                    likes, 
                    location, 
                    onlineAvailability, 
                    offlineAvailability,
                    onlineAvailabilityStart,
                    onlineAvailabilityEnd,
                    offlineAvailabilityStart,
                    offlineAvailabilityEnd 
                });
                const savedDoc = await newDoctor.save();
                console.log("Doctor added successfully", savedDoc);
                return NextResponse.json({ message: "Doctor added successfully", doctor: savedDoc }, { status: 201 });
    } catch (error: any){
        return NextResponse.json({message:"error in addind doctor", error: error.message }, { status: 500 });
    }
}