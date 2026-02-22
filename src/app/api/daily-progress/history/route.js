import { dbConnect, collections } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await dbConnect();
    const collection = db.collection(collections.TASKS);

    // গত ৭ দিনের তারিখ বের করা
    const historyData = await collection
      .find({})
      .sort({ date: -1 }) // নতুন ডাটা আগে
      .limit(7)           // শুধু ৭টি
      .toArray();

   
    const formattedData = historyData.reverse().map(item => ({
      name: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
      progress: item.progress,
      fullDate: item.date
    }));

    return NextResponse.json({ success: true, data: formattedData });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}