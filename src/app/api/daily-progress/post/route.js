import { dbConnect, collections as collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { date, tasks, progress } = body;

    const db = await dbConnect();
    
    // collectionNames.TASKS ব্যবহার করে সঠিক কালেকশন সিলেক্ট করা
    const collection = db.collection(collectionNames.TASKS);

    // আপডেট লজিক: এখানে 'collection' ভ্যারিয়েবল ব্যবহার করতে হবে
    const result = await collection.updateOne(
      { date: date },
      { $set: { tasks, progress, lastUpdated: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) return NextResponse.json({ success: false, error: "Date is required" });

    const db = await dbConnect();
    const collection = db.collection(collectionNames.TASKS);
    const data = await collection.findOne({ date: date });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}