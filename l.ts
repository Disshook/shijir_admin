// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";

// const protectedRoutes = [
//   "/",
//   "/travels",
//   "/banner",
//   "/bookings",
//   "/additional",
// ];

// const publicRoutes = ["/login"];

// export default async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   const isProtectedRoute = protectedRoutes.includes(pathname);
//   const isPublicRoute = publicRoutes.includes(pathname);

//   const token = cookies().get("token")?.value;

//   if (isProtectedRoute && !token) {
//     return NextResponse.redirect(new URL("/login", req.nextUrl));
//   }

//   if (isPublicRoute && token) {
//     return NextResponse.redirect(new URL("/", req.nextUrl));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
// };
