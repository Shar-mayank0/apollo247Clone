
import dbConnect from "@/lib/dbConnect";
import DoctorModel from "@/model/doctors_model";
import { NextRequest, NextResponse } from "next/server";


dbConnect()





export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const modeOfConsult = searchParams.get("modeOfConsult") || null;
        const experience = searchParams.get("experience") || null;
        const fees = searchParams.get("fees") || null;
        const language = searchParams.get("language") || null;
        const facility = searchParams.get("facility") || null;

        const query: any = {};
        
        if (modeOfConsult) {
            query.modeOfConsult = { $regex: modeOfConsult, $options: "i" };
        }
        
        if (experience) {
            const [min, max] = experience.replace(/"/g, '').split('-').map(Number);
            if (!isNaN(min) && !isNaN(max)) {
                query.experience = { $gte: min, $lte: max };
            }
        }
        
        if (language) {
            try {
                // Handle both array format and comma-separated format
                const langs = language.startsWith('[') 
                    ? JSON.parse(language.replace(/'/g, '"'))
                    : language.split(',');
                    
                query.language = { 
                    $in: langs.map((lang: string) => 
                        new RegExp(lang.replace(/[^a-zA-Z0-9 ]/g, ""), "i")
                    ) 
                };
            } catch (e) {
                console.error("Error parsing language:", e);
            }
        }
        
        if (fees) {
            const [min, max] = fees.replace(/"/g, '').split('-').map(Number);
            if (!isNaN(min) && !isNaN(max)) {
                query.fees = { $gte: min, $lte: max };
            }
        }
        
        if (facility) {
            query.facility = { $regex: facility, $options: "i" };
        }

        console.log("Query:", query);
        // const doctors = await DoctorModel.find(query).sort({ likes: -1 });
        return NextResponse.json(query, { status: 200 });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return NextResponse.json({ message: "Error fetching doctors", error: String(error) }, { status: 500 });
    }
}