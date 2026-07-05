"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCity } from "@/components/city/CityProvider";
import {
  MapPin,
  ChevronDown,
  Heart,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { City } from "@prisma/client";

export function Navbar({
  cities,
  currentCityId,
}: {
  cities: City[];
  currentCityId: string | null;
}) {
  const { data: session } = useSession();
  const { currentCity, setCurrentCity } = useCity();
  const [cityOpen, setCityOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (cityRef.current && !cityRef.current.contains(e.target as Node))
        setCityOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node))
        setUserOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const displayCity = currentCity || cities.find((c) => c.id === currentCityId) || null;

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-violet to-brand-red flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900 hidden sm:block">
              DevSoft Turismo
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {displayCity && (
              <div className="relative" ref={cityRef}>
                <button
                  onClick={() => setCityOpen(!cityOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:border-brand-violet transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4 text-brand-red" />
                  <span className="font-medium text-gray-700">
                    {displayCity.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {cityOpen && (
                  <div className="absolute top-full mt-2 right-0 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in">
                    {cities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => {
                          setCurrentCity(city);
                          setCityOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                          displayCity?.id === city.id
                            ? "text-brand-violet font-medium bg-violet-50"
                            : "text-gray-700"
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                        {city.name} - {city.state}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <Link
              href="/favorites"
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600 hover:text-brand-red"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {session?.user ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:border-brand-violet transition-colors text-sm"
                >
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700 hidden sm:inline">
                    {session.user.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {userOpen && (
                  <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in">
                    {session.user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Painel Admin
                      </Link>
                    )}
                    <Link
                      href="/favorites"
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      Favoritos
                    </Link>
                    <button
                      onClick={() => {
                        setUserOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl bg-brand-violet text-white text-sm font-medium hover:bg-violet-700 transition-colors"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}