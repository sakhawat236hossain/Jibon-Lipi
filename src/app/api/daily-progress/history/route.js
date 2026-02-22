import { dbConnect, collections } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await dbConnect();
    const collection = db.collection(collections.TASKS);

    // গত ৯০ দিনের ডাটা (হিটম্যাপের জন্য প্রয়োজন)
    const historyData = await collection
      .find({})
      .sort({ date: -1 }) 
      .limit(90)          
      .toArray();

    const formattedData = historyData.reverse().map(item => ({
      name: new Date(item.date).toLocaleDateString('bn-BD', { weekday: 'short' }), // বাংলা বার
      progress: item.progress,
      fullDate: item.date,
      date: item.date // হিটম্যাপ লজিকের জন্য মূল তারিখ
    }));

    return NextResponse.json({ success: true, data: formattedData });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}