import { useState, useEffect, useRef, KeyboardEvent } from "react";
import {
  HiHome, HiUsers, HiCog, HiMoon, HiSun, HiLogout,
  HiEye, HiEyeOff, HiSearch, HiX, HiPencil, HiSave,
  HiPhone, HiCalendar, HiLocationMarker, HiBookOpen,
  HiChevronRight, HiCamera, HiExclamationCircle,
} from "react-icons/hi";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { SiChianetwork } from "react-icons/si";

// ═══════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════
interface Student {
  id: number; firstName: string; lastName: string;
  email: string; phone: string; age: number;
  university: string; gender: string; subject: string;
}
interface UserProfile {
  firstName: string; lastName: string; phone: string;
  birthDate: string; address: string; subject: string; image: string;
}
type Page = "asosiy" | "o'quvchilar" | "sozlamalar";

// ═══════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════
const VALID_EMAIL = "teacher@edunex.uz";
const VALID_PASS = "edunex";
const SUBJECTS = ["Matematika", "Ingliz tili", "Fizika", "Kimyo", "Biologiya", "Xitoy tili", "Dasturlash", "Tarix"];
const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f97316", "#14b8a6", "#6366f1", "#ef4444"];
const MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];

const TEACHERS = [
  { initials: "MK", name: "Mohira Karimova", subject: "MATEMATIKA", color: "#8b5cf6" },
  { initials: "OT", name: "Ozoda Turdiyeva", subject: "XITOY TILI", color: "#10b981" },
  { initials: "NF", name: "Nozima Faxriddinova", subject: "POCHEMUCHKA", color: "#60a5fa" },
  { initials: "MS", name: "Muxlisa Sadullayeva", subject: "INGLIZ TILI", color: "#ef4444" },
  { initials: "MX", name: "Muxlisa Xolmominova", subject: "MATEMATIKA", color: "#059669" },
  { initials: "ZR", name: "Zulfiya Rahimova", subject: "FIZIKA", color: "#f97316" },
  { initials: "DY", name: "Dilnoza Yusupova", subject: "KIMYO", color: "#ec4899" },
  { initials: "BT", name: "Barno Toshmatova", subject: "BIOLOGIYA", color: "#14b8a6" },
];

const DEFAULT_PROFILE: UserProfile = {
  firstName: "Ismingiz", lastName: "Familiyangiz",
  phone: "+998991234567", birthDate: "2026-05-26",
  address: "Toshkent", subject: "Kasbingiz", image: "",
};

// ═══════════════════════════════════════════
// LOGIN PAGE
// ═══════════════════════════════════════════
function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("teacher@edunex.uz");
  const [pass, setPass] = useState("edunex");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setError(""); setLoading(true);
    setTimeout(() => {
      if (email.trim() === VALID_EMAIL && pass === VALID_PASS) { onLogin(); }
      else { setError("Login yoki parol noto'g'ri!"); setLoading(false); }
    }, 700);
  };
  const onKey = (e: KeyboardEvent) => { if (e.key === "Enter") submit(); };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-gray-950">
      {/* Left panel */}
      <div className="hidden lg:flex w-[44%] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex-col items-center justify-center p-14 relative overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl -top-20 -left-20" />
        <div className="absolute w-72 h-72 rounded-full bg-blue-500/15 blur-3xl bottom-0 right-0" />
        <div className="relative z-10 text-center w-full max-w-sm">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-white font-black text-3xl">E</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">EDUNEX</h1>
          <p className="text-slate-400 mt-2 text-base">O'qituvchi boshqaruv tizimi</p>
          <div className="mt-12 flex flex-col gap-4 text-left">
            {[
              { icon: "✓", color: "text-emerald-400", title: "O'quvchilarni boshqaring", desc: "Davomat, baholar, guruhlar" },
              { icon: "📊", color: "text-blue-400", title: "Real statistika", desc: "Jonli ko'rsatkichlar" },
              { icon: "⚙️", color: "text-purple-400", title: "Qulay sozlamalar", desc: "Profil va xususiyatlar" },
            ].map(item => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className={`text-sm font-semibold mb-1 ${item.color}`}>{item.icon}  {item.title}</div>
                <div className="text-slate-400 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-black">E</span>
            </div>
            <span className="text-xl font-black text-gray-900 dark:text-white">EDUNEX</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">Xush kelibsiz 👋</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">Hisobingizga kiring</p>

          {error && (
            <div className="mb-5 flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
              <HiExclamationCircle className="text-lg flex-shrink-0" /> {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Login / Email</label>
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={onKey}
                placeholder="Login / Email"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div className="relative">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Parol</label>
              <input type={showPass ? "text" : "password"} value={pass} onChange={e => setPass(e.target.value)} onKeyDown={onKey}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500 transition-colors pr-12" />
              <button onClick={() => setShowPass(s => !s)} className="absolute right-4 bottom-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-xl">
                {showPass ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 mb-6">
            <label className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-blue-500 w-4 h-4" /> Meni eslab qol
            </label>
            <span className="text-sm text-blue-500 cursor-pointer hover:underline">Parolni unutdingizmi?</span>
          </div>

          <button onClick={submit} disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-4 rounded-xl transition-all text-base flex items-center justify-center gap-2 disabled:opacity-70">
            {loading && <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {loading ? "Tekshirilmoqda..." : "Kirish"}
          </button>
          <p className="text-center mt-6 text-xs text-gray-400">
            Demo: <span className="text-gray-600 dark:text-gray-300 font-medium">teacher@edunex.uz</span> / <span className="text-gray-600 dark:text-gray-300 font-medium">edunex</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// LOGOUT MODAL
// ═══════════════════════════════════════════
function LogoutModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-sm shadow-2xl text-center">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <HiLogout className="text-3xl text-red-500" />
        </div>
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Chiqishni xohlaysizmi?</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-7">Tizimdan chiqiladi va login sahifasiga o'tiladi</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
            Bekor qilish
          </button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all">
            Ha, chiqish
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════
function Sidebar({ page, setPage, darkMode, setDarkMode, onLogout, profile }: {
  page: Page; setPage: (p: Page) => void;
  darkMode: boolean; setDarkMode: (v: boolean) => void;
  onLogout: () => void; profile: UserProfile;
}) {
  const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
    { id: "asosiy", label: "Asosiy", icon: <HiHome className="text-lg" /> },
    { id: "o'quvchilar", label: "O'quvchilarim", icon: <HiUsers className="text-lg" /> },
    { id: "sozlamalar", label: "Sozlamalar", icon: <HiCog className="text-lg" /> },
  ];

  return (
    <aside className="w-64 h-screen flex flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100 dark:border-gray-800">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow">
          <span className="text-white font-black text-sm">E</span>
        </div>
        <div>
          <div className="font-black text-base text-gray-900 dark:text-white tracking-tight">EDUNEX</div>
          <div className="text-xs text-gray-400">O'qituvchi paneli</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-5 space-y-1">
        {navItems.map(({ id, label, icon }) => (
          <button key={id} onClick={() => setPage(id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${page === id
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              }`}>
            {icon}{label}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-4 pb-4 space-y-1 border-t border-gray-100 dark:border-gray-800 pt-4">
        <button onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all">
          {darkMode ? <HiSun className="text-lg text-yellow-400" /> : <HiMoon className="text-lg" />}
          {darkMode ? "Kunduz rejimi" : "Tun rejimi"}
          <span className={`ml-auto w-10 h-5 rounded-full transition-all duration-300 flex items-center px-0.5 flex-shrink-0 ${darkMode ? "bg-blue-500" : "bg-gray-200"}`}>
            <span className={`w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${darkMode ? "translate-x-5" : "translate-x-0"}`} />
          </span>
        </button>
        <button onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
          <HiLogout className="text-lg" />Chiqish
        </button>
      </div>

      {/* User card */}
      <div className="mx-4 mb-5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center gap-3">
        {profile.image ? (
          <img src={profile.image} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" alt="avatar" />
        ) : (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {profile.firstName[0]}{profile.lastName[0]}
          </div>
        )}
        <div className="min-w-0">
          <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{profile.firstName} {profile.lastName}</div>
          <div className="text-xs text-gray-400 truncate">{profile.subject}</div>
        </div>
      </div>
    </aside>
  );
}

// ═══════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════
function HomePage({ profile, students }: { profile: UserProfile; students: Student[] }) {
  const now = new Date();
  const h = now.getHours();
  const greeting = h < 12 ? "Xayrli tong" : h < 17 ? "Xayrli kun" : "Xayrli kech";
  const dateStr = `${now.getDate()}-${MONTHS[now.getMonth()]}, ${now.getFullYear()}`;
  const doubled = [...TEACHERS, ...TEACHERS];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 px-10 py-10 text-white min-h-[180px] flex items-center">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 80% 50%, #6366f1, transparent 55%)" }} />
        {/* Profile circle top-right */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
          {profile.image
            ? <img src={profile.image} className="w-full h-full object-cover" alt="avatar" />
            : <span className="text-white font-black text-3xl">{profile.firstName[0]}{profile.lastName[0]}</span>
          }
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <SiChianetwork className="text-emerald-400 text-base animate-pulse" />
            <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Online</span>
          </div>
          <div className="text-gray-300 text-xl">{greeting},</div>
          <div className="text-5xl font-black mt-1">{profile.firstName}</div>
          <div className="flex items-center gap-2 mt-4 text-gray-400 text-sm">
            <HiCalendar className="text-base" /> {dateStr}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: "Faol o'quvchilar", value: students.length || "—", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", icon: <HiUsers className="text-xl text-blue-500" /> },
          { label: "Guruhlar", value: 9, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20", icon: <HiBookOpen className="text-xl text-purple-500" /> },
          { label: "Davomat (30 kun)", value: "82%", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", icon: <HiCalendar className="text-xl text-emerald-500" /> },
          { label: "O'rtacha baho", value: "85%", color: "text-orange-500 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-900/20", icon: <span className="text-xl">⭐</span> },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 hover:shadow-md transition-all">
            <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center mb-4`}>{s.icon}</div>
            <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-sm text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Teachers marquee — odamlar aylanib turadi */}
      <div>
        <h2 className="text-lg font-black text-gray-900 dark:text-white mb-5">🏫 Bizning Jamoa</h2>
        <div className="overflow-hidden">
          <div
            className="flex gap-4"
            style={{
              width: "max-content",
              animation: "marquee 30s linear infinite",
            }}>
            {doubled.map((t, i) => (
              <div key={i}
                className="flex-shrink-0 w-44 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 text-center hover:scale-105 transition-transform cursor-pointer"
                style={{ animationPlayState: "running" }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3" style={{ background: t.color }}>
                  {t.initials}
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{t.name}</div>
                <div className="text-xs text-blue-500 font-medium mt-1">{t.subject}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentsPage({ students, loading }: { students: Student[]; loading: boolean }) {
  const [search, setSearch] = useState("");
  const filtered = students.filter(s =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center h-80">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-400 text-sm">O'quvchilar yuklanmoqda...</span>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">O'quvchilarim</h1>
          <p className="text-gray-400 text-sm mt-1">Jami {students.length} ta o'quvchi</p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 shadow-sm">
          <HiSearch className="text-gray-400 text-lg" />
          <input type="text" placeholder="Qidirish..." value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm text-gray-900 dark:text-white placeholder-gray-400 w-52" />
          {search && <button onClick={() => setSearch("")}><HiX className="text-gray-400 hover:text-gray-600 text-lg" /></button>}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <HiUsers className="text-6xl mx-auto mb-4 opacity-30" />
          <div className="font-medium">O'quvchi topilmadi</div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {filtered.map((s, i) => (
            <div key={s.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                  style={{ background: COLORS[i % COLORS.length] }}>
                  {s.firstName[0]}{s.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 dark:text-white truncate">{s.firstName} {s.lastName}</div>
                  <div className="text-xs text-gray-400 mt-0.5 truncate">{s.email}</div>
                  <span className={`inline-flex mt-2 px-2 py-0.5 rounded-lg text-xs font-medium ${s.gender === "male" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"}`}>
                    {s.gender === "male" ? "Erkak" : "Ayol"}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50 dark:border-gray-800 grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-400 mb-0.5 flex items-center gap-1"><HiPhone className="text-xs" />Telefon</div>
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{s.phone}</div>
              </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5 flex items-center gap-1"><HiBookOpen className="text-xs" />Fan</div>
                  <div className="text-xs font-semibold text-blue-500">{s.subject}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-gray-400 mb-0.5">Universitet</div>
                  <div className="text-xs text-gray-700 dark:text-gray-300 truncate">{s.university}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SettingsPage({ profile, setProfile, darkMode, setDarkMode, onLogout }: {
  profile: UserProfile; setProfile: (p: UserProfile) => void;
  darkMode: boolean; setDarkMode: (v: boolean) => void; onLogout: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<UserProfile>(profile);
  const fileRef = useRef<HTMLInputElement>(null);

  const openEdit = () => { setForm(profile); setEditing(true); };
  const save = () => { setProfile(form); setEditing(false); };
  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm(f => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const infoRows = [
    { icon: <HiPhone className="text-blue-400 text-lg" />, label: "Telefon", value: profile.phone },
    { icon: <HiCalendar className="text-purple-400 text-lg" />, label: "Tug'ilgan sana", value: profile.birthDate },
    { icon: <HiLocationMarker className="text-red-400 text-lg" />, label: "Manzil", value: profile.address },
    { icon: <HiBookOpen className="text-green-400 text-lg" />, label: "Fan", value: profile.subject },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-black text-gray-900 dark:text-white">Profil</h1>

      {/* Profile hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-indigo-950 px-8 py-7 flex items-center gap-6">
        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
          {profile.image
            ? <img src={profile.image} className="w-full h-full object-cover" alt="avatar" />
            : <span className="text-white font-black text-2xl">{profile.firstName[0]}{profile.lastName[0]}</span>
          }
        </div>
        <div className="flex-1">
          <div className="text-2xl font-black text-white">{profile.firstName} {profile.lastName}</div>
          <div className="text-gray-400 text-sm mt-1">O'qituvchi · {profile.subject} · 3 yil</div>
        </div>
        <button onClick={openEdit} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all">
          <HiPencil className="text-lg" />
        </button>
      </div>

      {/* Info */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-3 border-b border-gray-50 dark:border-gray-800 text-xs font-bold uppercase tracking-widest text-gray-400">MA'LUMOTLAR</div>
        {infoRows.map((row, i) => (
          <div key={i} className={`flex items-center gap-4 px-6 py-4 ${i > 0 ? "border-t border-gray-50 dark:border-gray-800" : ""}`}>
            {row.icon}
            <span className="text-sm text-gray-400 flex-1">{row.label}</span>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{row.value || "—"}</span>
          </div>
        ))}
      </div>

      {/* Sozlamalar */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-3 border-b border-gray-50 dark:border-gray-800 text-xs font-bold uppercase tracking-widest text-gray-400">SOZLAMALAR</div>
        <div className="flex items-center gap-4 px-6 py-4">
          {darkMode ? <HiSun className="text-yellow-400 text-xl" /> : <HiMoon className="text-gray-400 text-xl" />}
          <span className="text-sm font-medium text-gray-800 dark:text-white flex-1">{darkMode ? "Kunduz rejimi" : "Tungi rejim"}</span>
          <button onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${darkMode ? "bg-blue-500" : "bg-gray-200"}`}>
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${darkMode ? "left-7" : "left-1"}`} />
          </button>
        </div>
        <div className="flex items-center gap-4 px-6 py-4 border-t border-gray-50 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={onLogout}>
          <HiLogout className="text-red-500 text-xl" />
          <span className="text-sm font-medium text-red-500 flex-1">Tizimdan chiqish</span>
          <HiChevronRight className="text-red-400 text-lg" />
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">Profilni tahrirlash</h3>
              <button onClick={() => setEditing(false)} className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                <HiX className="text-lg" />
              </button>
            </div>
            <div className="px-7 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
              {/* Image upload */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center cursor-pointer relative group"
                  onClick={() => fileRef.current?.click()}>
                  {form.image
                    ? <img src={form.image} className="w-full h-full object-cover" alt="avatar" />
                    : <span className="text-white font-black text-2xl">{form.firstName[0]}{form.lastName[0]}</span>
                  }
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <HiCamera className="text-white text-3xl" />
                  </div>
                </div>
                <span className="text-xs text-gray-400">Rasmni o'zgartirish</span>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImg} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[{ label: "ISM", key: "firstName" }, { label: "FAMILIYA", key: "lastName" }].map(({ label, key }) => (
                  <div key={key}>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">{label}</label>
                    <input type="text" value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500" />
                  </div>
                ))}
              </div>
              {[
                { label: "TELEFON RAQAM", key: "phone", type: "tel" },
                { label: "TUG'ILGAN SANA", key: "birthDate", type: "date" },
                { label: "MANZIL", key: "address", type: "text" },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">{label}</label>
                  <input type={type} value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500" />
                </div>
              ))}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">FAN</label>
                <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:border-blue-500">
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="px-7 pb-6">
              <button onClick={save} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
                <HiSave className="text-lg" /> Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => localStorage.getItem("edunex_auth") === "true");
  const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.getItem("edunex_dark") === "true");
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("edunex_profile");
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });
  const [students, setStudents] = useState<Student[]>([]);
  const [stuLoading, setStuLoading] = useState(true);
  const [page, setPage] = useState<Page>("asosiy");
  const [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=30")
      .then(r => r.json())
      .then(d => {
        setStudents(d.users.map((u: any, i: number) => ({ ...u, subject: SUBJECTS[i % SUBJECTS.length] })));
        setStuLoading(false);
      })
      .catch(() => {
        setStudents(Array.from({ length: 18 }, (_, i) => ({
          id: i + 1, firstName: ["Ali", "Zulfiya", "Bobur", "Malika", "Jasur"][i % 5],
          lastName: ["Karimov", "Yusupova", "Toshmatov", "Rahimova", "Xoliqov"][i % 5],
          email: `student${i + 1}@edu.uz`, phone: `+99890${String(i).padStart(7, "0")}`,
          age: 18 + (i % 8), university: "Toshkent Davlat Texnika Universiteti",
          gender: i % 2 === 0 ? "male" : "female", subject: SUBJECTS[i % SUBJECTS.length],
        })));
        setStuLoading(false);
      });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("edunex_dark", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("edunex_profile", JSON.stringify(profile));
  }, [profile]);

  const handleLogin = () => { localStorage.setItem("edunex_auth", "true"); setLoggedIn(true); };
  const handleLogout = () => { localStorage.removeItem("edunex_auth"); setLoggedIn(false); setLogoutModal(false); setPage("asosiy"); };

  if (!loggedIn) return <LoginPage onLogin={handleLogin} />;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <Sidebar page={page} setPage={setPage} darkMode={darkMode} setDarkMode={setDarkMode} onLogout={() => setLogoutModal(true)} profile={profile} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-screen-xl mx-auto px-10 py-8">
          {page === "asosiy" && <HomePage profile={profile} students={students} />}
          {page === "o'quvchilar" && <StudentsPage students={students} loading={stuLoading} />}
          {page === "sozlamalar" && <SettingsPage profile={profile} setProfile={setProfile} darkMode={darkMode} setDarkMode={setDarkMode} onLogout={() => setLogoutModal(true)} />}
        </div>
      </main>

      {logoutModal && <LogoutModal onConfirm={handleLogout} onCancel={() => setLogoutModal(false)} />}
    </div>
  );
}