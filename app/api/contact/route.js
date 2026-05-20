import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // FormSubmit expects form-encoded data (application/x-www-form-urlencoded)
    const params = new URLSearchParams();
    Object.keys(body || {}).forEach((k) => {
      if (body[k] !== undefined && body[k] !== null) params.append(k, String(body[k]));
    });

    const response = await fetch("https://formsubmit.co/owenhartman468@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: params.toString(),
    });

    let result = { success: false };
    try {
      // FormSubmit may return JSON or plain text; try JSON first
      result = await response.json();
    } catch (err) {
      // Fallback: build a simple result from status
      result = { success: response.ok, status: response.status };
    }

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error("Contact API route error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
