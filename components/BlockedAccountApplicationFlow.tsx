"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Check,
  ChevronDown,
  Plus,
  Upload,
  UserRound,
  Video,
  X,
} from "lucide-react";
import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from "react";

type StepId =
  | "signup"
  | "uploadDocuments"
  | "faceVerification"
  | "blockingDetails"
  | "payers"
  | "review"
  | "confirm";

interface Sponsor {
  id: number;
  name: string;
  relation: string;
  amount: string;
}

interface FormDataState {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  streetAndHouse: string;
  additionalAddress: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
  email: string;
  phoneDialCode: string;
  phoneNumber: string;
  arrivalDate: string;
  applicationType: string;
  acceptedTerms: boolean;

  birthName: string;
  passportNumber: string;
  birthDate: string;
  passportIssueDate: string;
  countryOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  passportIssuePlace: string;
  passportExpiryDate: string;

  documentProofType: string;
  contractDurationMonths: string;
  blockedAmountPerMonth: string;
}

interface BlockedAccountApplicationFlowProps {
  isOpen?: boolean;
  onClose?: () => void;
  mode?: "modal" | "page";
}

const STEPS: Array<{ id: StepId; label: string; short: string }> = [
  { id: "signup", label: "Sign Up", short: "Personal Information" },
  { id: "uploadDocuments", label: "Upload Documents", short: "Passport Information" },
  { id: "faceVerification", label: "Face Verification", short: "Face Verification" },
  { id: "blockingDetails", label: "Blocking Details", short: "Blocking Details" },
  { id: "payers", label: "Payers", short: "Payers / Sponsors" },
  { id: "review", label: "Review", short: "Review & Confirm" },
  { id: "confirm", label: "Confirm", short: "Submission Complete" },
];

const COUNTRIES = [
  { name: "India", dialCode: "+91" },
  { name: "Germany", dialCode: "+49" },
  { name: "Pakistan", dialCode: "+92" },
  { name: "Nepal", dialCode: "+977" },
  { name: "Bangladesh", dialCode: "+880" },
  { name: "Sri Lanka", dialCode: "+94" },
  { name: "United Arab Emirates", dialCode: "+971" },
  { name: "United States", dialCode: "+1" },
  { name: "Canada", dialCode: "+1" },
  { name: "United Kingdom", dialCode: "+44" },
];

const INDIA_DISTRICTS = [
  "Amritsar",
  "Barnala",
  "Bathinda",
  "Faridkot",
  "Fatehgarh Sahib",
  "Fazilka",
  "Ferozepur",
  "Gurdaspur",
  "Hoshiarpur",
  "Jalandhar",
  "Kapurthala",
  "Ludhiana",
  "Mansa",
  "Moga",
  "Pathankot",
  "Patiala",
  "Rupnagar",
  "S.A.S. Nagar (Mohali)",
  "Sangrur",
  "Shahid Bhagat Singh Nagar",
  "Sri Muktsar Sahib",
  "Tarn Taran",
];

const PUNJAB_DISTRICT_CITY_MAP: Record<string, string[]> = {
  Amritsar: ["Amritsar", "Ajnala", "Majitha"],
  Barnala: ["Barnala", "Tapa"],
  Bathinda: ["Bathinda", "Raman", "Talwandi Sabo"],
  Faridkot: ["Faridkot", "Kotkapura", "Jaitu"],
  "Fatehgarh Sahib": ["Fatehgarh Sahib", "Sirhind", "Bassi Pathana"],
  Fazilka: ["Fazilka", "Abohar", "Jalalabad"],
  Ferozepur: ["Ferozepur", "Zira", "Makhu"],
  Gurdaspur: ["Gurdaspur", "Batala", "Dinanagar"],
  Hoshiarpur: ["Hoshiarpur", "Garhshankar", "Dasuya"],
  Jalandhar: ["Jalandhar", "Phillaur", "Nakodar"],
  Kapurthala: ["Kapurthala", "Phagwara", "Sultanpur Lodhi"],
  Ludhiana: ["Ludhiana", "Khanna", "Samrala"],
  Mansa: ["Mansa", "Budhlada", "Sardulgarh"],
  Moga: ["Moga", "Bagha Purana", "Nihal Singh Wala"],
  Pathankot: ["Pathankot", "Sujanpur"],
  Patiala: ["Patiala", "Rajpura", "Nabha"],
  Rupnagar: ["Rupnagar", "Anandpur Sahib", "Nangal"],
  "S.A.S. Nagar (Mohali)": ["Mohali", "Kharar", "Zirakpur"],
  Sangrur: ["Sangrur", "Sunam", "Malerkotla"],
  "Shahid Bhagat Singh Nagar": ["Nawanshahr", "Banga"],
  "Sri Muktsar Sahib": ["Muktsar", "Malout", "Gidderbaha"],
  "Tarn Taran": ["Tarn Taran", "Patti", "Khem Karan"],
};

const TITLE_OPTIONS = ["Mr", "Mrs", "Ms", "Mx"];
const GENDER_OPTIONS = ["Male", "Female", "Prefer not to say", "Various"];
const APPLICATION_TYPE_OPTIONS = [
  "Student",
  "Job seekers",
  "Vocational training",
  "Language learner",
  "Other",
];

const VISA_PROOF_OPTIONS = [
  "Registration certificate",
  "Apprenticeship contract",
  "Visa application for Chance Card",
  "Other",
];

const CONTRACT_DURATIONS = Array.from({ length: 24 }, (_, i) => `${i + 1}`);

const SETUP_FEE = 99;
const MONTHLY_MAINTENANCE_FEE = 6;
const BUFFER_AMOUNT = 70;

const INITIAL_DATA: FormDataState = {
  title: "",
  firstName: "",
  lastName: "",
  gender: "",
  streetAndHouse: "",
  additionalAddress: "",
  city: "",
  district: "",
  postalCode: "",
  country: "India",
  email: "",
  phoneDialCode: "+91",
  phoneNumber: "",
  arrivalDate: "",
  applicationType: "",
  acceptedTerms: false,

  birthName: "",
  passportNumber: "",
  birthDate: "",
  passportIssueDate: "",
  countryOfBirth: "",
  placeOfBirth: "",
  nationality: "",
  passportIssuePlace: "",
  passportExpiryDate: "",

  documentProofType: "",
  contractDurationMonths: "1",
  blockedAmountPerMonth: "992",
};

function stepIndex(step: StepId) {
  return STEPS.findIndex((s) => s.id === step);
}

function toCurrency(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default function BlockedAccountApplicationFlow({
  isOpen = false,
  onClose,
  mode = "modal",
}: BlockedAccountApplicationFlowProps) {
  const [currentStep, setCurrentStep] = useState<StepId>("signup");
  const [data, setData] = useState<FormDataState>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string>("");
  const [eligibilityFile, setEligibilityFile] = useState<File | null>(null);
  const [faceVerified, setFaceVerified] = useState(false);
  const [cameraDenied, setCameraDenied] = useState(true);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  const [newSponsorName, setNewSponsorName] = useState("");
  const [newSponsorRelation, setNewSponsorRelation] = useState("");
  const [newSponsorAmount, setNewSponsorAmount] = useState("");

  const currentIndex = stepIndex(currentStep);

  const selectedDistrictCities = useMemo(() => {
    if (data.country !== "India" || !data.district) return [];
    return PUNJAB_DISTRICT_CITY_MAP[data.district] ?? [];
  }, [data.country, data.district]);

  const blockedAmount = Number(data.blockedAmountPerMonth) || 0;
  const durationMonths = Number(data.contractDurationMonths) || 0;
  const totalBlockedBase = blockedAmount * durationMonths;
  const maintenanceTotal = durationMonths * MONTHLY_MAINTENANCE_FEE;
  const totalBlockedAmount = totalBlockedBase + SETUP_FEE + maintenanceTotal + BUFFER_AMOUNT;

  const shouldRender = mode === "page" ? true : isOpen;

  useEffect(() => {
    if (mode !== "modal" || !isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, mode]);

  function resetAll() {
    setCurrentStep("signup");
    setData(INITIAL_DATA);
    setErrors({});
    setPassportFile(null);
    setPassportPreview("");
    setEligibilityFile(null);
    setFaceVerified(false);
    setCameraDenied(true);
    setSponsors([]);
    setNewSponsorName("");
    setNewSponsorRelation("");
    setNewSponsorAmount("");
  }

  function closeFlow() {
    onClose?.();
    setTimeout(() => {
      resetAll();
    }, 250);
  }

  function setField<K extends keyof FormDataState>(field: K, value: FormDataState[K]) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }

  function handleCountryChange(country: string) {
    const selected = COUNTRIES.find((item) => item.name === country);
    setData((prev) => ({
      ...prev,
      country,
      phoneDialCode: selected?.dialCode ?? prev.phoneDialCode,
      district: country === "India" ? prev.district : "",
      city: country === "India" ? prev.city : "",
    }));
    if (errors.country || errors.district || errors.city) {
      setErrors((prev) => ({ ...prev, country: "", district: "", city: "" }));
    }
  }

  function handleDialCodeChange(dialCode: string) {
    const selectedCountry = COUNTRIES.find((item) => item.dialCode === dialCode);
    setData((prev) => ({
      ...prev,
      phoneDialCode: dialCode,
      country: selectedCountry?.name ?? prev.country,
      district: selectedCountry?.name === "India" ? prev.district : "",
      city: selectedCountry?.name === "India" ? prev.city : "",
    }));
  }

  function onFileChange(file: File | null, type: "passport" | "eligibility") {
    if (!file) return;
    if (type === "passport") {
      setPassportFile(file);
      setPassportPreview(URL.createObjectURL(file));
      if (errors.passportFile) setErrors((prev) => ({ ...prev, passportFile: "" }));
      return;
    }
    setEligibilityFile(file);
    if (errors.eligibilityFile) setErrors((prev) => ({ ...prev, eligibilityFile: "" }));
  }

  function validateCurrentStep() {
    const nextErrors: Record<string, string> = {};

    if (currentStep === "signup") {
      if (!data.title) nextErrors.title = "Please choose title.";
      if (!data.firstName.trim()) nextErrors.firstName = "First name is required.";
      if (!data.lastName.trim()) nextErrors.lastName = "Last name is required.";
      if (!data.gender) nextErrors.gender = "Please choose your gender.";
      if (!data.streetAndHouse.trim()) nextErrors.streetAndHouse = "Street and house number is required.";
      if (!data.city.trim()) nextErrors.city = "City is required.";
      if (!data.district.trim() && data.country === "India") nextErrors.district = "District is required.";
      if (!data.postalCode.trim()) nextErrors.postalCode = "Postal code is required.";
      if (!data.country) nextErrors.country = "Country is required.";
      if (!data.email.trim()) nextErrors.email = "Email is required.";
      if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) nextErrors.email = "Please enter a valid email.";
      if (!data.phoneNumber.trim()) nextErrors.phoneNumber = "Phone number is required.";
      if (!data.arrivalDate) nextErrors.arrivalDate = "Arrival date is required.";
      if (!data.applicationType) nextErrors.applicationType = "Please select application type.";
      if (!data.acceptedTerms) nextErrors.acceptedTerms = "You must accept Terms and Privacy Policy.";
    }

    if (currentStep === "uploadDocuments") {
      if (!passportFile) nextErrors.passportFile = "Please upload your passport file.";
      if (!data.birthName.trim()) nextErrors.birthName = "Birth name is required.";
      if (!data.passportNumber.trim()) nextErrors.passportNumber = "Passport number is required.";
      if (!data.birthDate) nextErrors.birthDate = "Birthday is required.";
      if (!data.passportIssueDate) nextErrors.passportIssueDate = "Passport issue date is required.";
      if (!data.countryOfBirth.trim()) nextErrors.countryOfBirth = "Country of birth is required.";
      if (!data.placeOfBirth.trim()) nextErrors.placeOfBirth = "Place of birth is required.";
      if (!data.nationality.trim()) nextErrors.nationality = "Nationality is required.";
      if (!data.passportIssuePlace.trim()) nextErrors.passportIssuePlace = "Place/country of issue is required.";
      if (!data.passportExpiryDate) nextErrors.passportExpiryDate = "Passport expiry date is required.";
    }

    if (currentStep === "faceVerification") {
      if (!faceVerified) nextErrors.faceVerified = "Please complete face verification before continuing.";
    }

    if (currentStep === "blockingDetails") {
      if (!data.documentProofType) nextErrors.documentProofType = "Please choose document type.";
      if (!eligibilityFile) nextErrors.eligibilityFile = "Please upload eligibility document.";
      if (!data.contractDurationMonths) nextErrors.contractDurationMonths = "Please choose contract duration.";
      if (!data.blockedAmountPerMonth || Number(data.blockedAmountPerMonth) <= 0) {
        nextErrors.blockedAmountPerMonth = "Blocked amount must be greater than zero.";
      }
    }

    if (currentStep === "review" && !data.acceptedTerms) {
      nextErrors.acceptedTerms = "Please keep terms acceptance checked before final submit.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (!validateCurrentStep()) return;

    if (currentStep === "confirm") return;
    const next = STEPS[currentIndex + 1];
    if (next) setCurrentStep(next.id);
  }

  function goBack() {
    if (currentStep === "signup") return;
    const prev = STEPS[currentIndex - 1];
    if (prev) setCurrentStep(prev.id);
  }

  function submitApplication() {
    if (!validateCurrentStep()) return;
    setCurrentStep("confirm");
  }

  function addSponsor() {
    if (!newSponsorName.trim() || !newSponsorRelation.trim() || !newSponsorAmount.trim()) return;
    setSponsors((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newSponsorName,
        relation: newSponsorRelation,
        amount: newSponsorAmount,
      },
    ]);
    setNewSponsorName("");
    setNewSponsorRelation("");
    setNewSponsorAmount("");
  }

  const stepTitle = STEPS[currentIndex];

  return (
    <AnimatePresence>
      {shouldRender && (
        <>
          {mode === "modal" && (
            <motion.div
              className="fixed inset-0 z-[60] bg-[#081126]/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFlow}
            />
          )}

          <motion.div
            className={
              mode === "modal"
                ? "fixed inset-0 z-[61] p-3 md:p-6 lg:p-10"
                : "relative min-h-screen bg-[radial-gradient(circle_at_top_right,#dce8ff_0%,#f7faff_40%,#ffffff_100%)] py-6 md:py-10 px-3 md:px-6"
            }
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div
              className={
                mode === "modal"
                  ? "mx-auto h-full max-w-[1220px] rounded-3xl border border-[#dbe1ea] bg-white shadow-[0_32px_90px_rgba(6,24,44,0.35)] overflow-hidden flex flex-col"
                  : "mx-auto min-h-[88vh] max-w-[1240px] rounded-3xl border border-[#dbe1ea] bg-white shadow-[0_16px_40px_rgba(6,24,44,0.12)] overflow-hidden flex flex-col"
              }
            >
              <div className="border-b border-[#e7ecf3] px-5 md:px-8 py-4 md:py-5 bg-[#fbfdff]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] tracking-[0.14em] uppercase text-[#4b5b77] font-medium">
                      PLURO BLOCKED ACCOUNT
                    </p>
                    <h2 className="mt-1 text-xl md:text-2xl font-semibold tracking-tight text-[#0b1b33]">
                      {stepTitle.short}
                    </h2>
                    <p className="text-sm text-[#5b6b86] mt-1">
                      Step {String(currentIndex + 1).padStart(2, "0")} of {String(STEPS.length).padStart(2, "0")}
                    </p>
                  </div>

                  {onClose && (
                    <button
                      type="button"
                      onClick={closeFlow}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d6deea] text-[#475a7c] hover:bg-[#f5f8fc] transition"
                      aria-label="Close form"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                <div className="mt-4 overflow-x-auto">
                  <div className="min-w-[760px] flex items-center gap-2">
                    {STEPS.map((step, index) => {
                      const isDone = index < currentIndex;
                      const isActive = index === currentIndex;
                      return (
                        <div key={step.id} className="flex items-center flex-1 min-w-[92px]">
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-6 w-6 rounded-full border text-[11px] font-semibold inline-flex items-center justify-center ${
                                isDone
                                  ? "bg-primary border-primary text-white"
                                  : isActive
                                  ? "border-primary text-primary bg-primary/10"
                                  : "border-[#d6deea] text-[#7e8da7] bg-white"
                              }`}
                            >
                              {isDone ? <Check size={14} /> : String(index + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`text-[12px] whitespace-nowrap ${
                                isActive ? "text-[#0b1b33] font-medium" : "text-[#7b8ca8]"
                              }`}
                            >
                              {step.label}
                            </span>
                          </div>
                          {index < STEPS.length - 1 && (
                            <div className={`mx-2 h-[1px] flex-1 ${index < currentIndex ? "bg-primary" : "bg-[#e7edf6]"}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-auto px-4 md:px-8 py-5 md:py-7 bg-[#fcfdff]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    {currentStep === "signup" && (
                      <div className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-4">
                          <Field label="Title *" error={errors.title}>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {TITLE_OPTIONS.map((option) => (
                                <button
                                  type="button"
                                  key={option}
                                  onClick={() => setField("title", option)}
                                  className={`h-11 rounded-xl border text-sm transition ${
                                    data.title === option
                                      ? "border-primary bg-primary/5 text-primary"
                                      : "border-[#d9e1ec] bg-white text-[#273a59] hover:border-[#b9c6db]"
                                  }`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </Field>

                          <SelectField
                            label="Choose your gender *"
                            value={data.gender}
                            onChange={(value) => setField("gender", value)}
                            options={GENDER_OPTIONS}
                            placeholder="Choose your gender"
                            error={errors.gender}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <InputField
                            label="First names *"
                            value={data.firstName}
                            onChange={(value) => setField("firstName", value)}
                            placeholder="Enter your first name"
                            error={errors.firstName}
                          />
                          <InputField
                            label="Last name *"
                            value={data.lastName}
                            onChange={(value) => setField("lastName", value)}
                            placeholder="Enter your last name"
                            error={errors.lastName}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <InputField
                            label="Street and house number *"
                            value={data.streetAndHouse}
                            onChange={(value) => setField("streetAndHouse", value)}
                            placeholder="Enter your street and house no."
                            error={errors.streetAndHouse}
                          />
                          <InputField
                            label="Additional address information"
                            value={data.additionalAddress}
                            onChange={(value) => setField("additionalAddress", value)}
                            placeholder="Landmark / apartment / block"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <SelectField
                            label="Country *"
                            value={data.country}
                            onChange={handleCountryChange}
                            options={COUNTRIES.map((c) => c.name)}
                            placeholder="Select country"
                            error={errors.country}
                          />
                          <SelectField
                            label={data.country === "India" ? "District / State *" : "State / Region"}
                            value={data.district}
                            onChange={(value) => setField("district", value)}
                            options={data.country === "India" ? INDIA_DISTRICTS : []}
                            placeholder={data.country === "India" ? "Select district in Punjab" : "Optional"}
                            disabled={data.country !== "India"}
                            error={errors.district}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          {selectedDistrictCities.length > 0 ? (
                            <SelectField
                              label="City name *"
                              value={data.city}
                              onChange={(value) => setField("city", value)}
                              options={selectedDistrictCities}
                              placeholder="Select city"
                              error={errors.city}
                            />
                          ) : (
                            <InputField
                              label="City name *"
                              value={data.city}
                              onChange={(value) => setField("city", value)}
                              placeholder="Enter your city"
                              error={errors.city}
                            />
                          )}

                          <InputField
                            label="Postal code *"
                            value={data.postalCode}
                            onChange={(value) => setField("postalCode", value)}
                            placeholder="Enter postal code"
                            error={errors.postalCode}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <InputField
                            label="E-mail address *"
                            type="email"
                            value={data.email}
                            onChange={(value) => setField("email", value)}
                            placeholder="example@example.com"
                            error={errors.email}
                          />

                          <Field label="Phone number *" error={errors.phoneNumber}>
                            <div className="flex gap-2">
                              <SelectFieldInner
                                value={data.phoneDialCode}
                                onChange={handleDialCodeChange}
                                options={[...new Set(COUNTRIES.map((c) => c.dialCode))]}
                              />
                              <input
                                type="tel"
                                value={data.phoneNumber}
                                onChange={(event) => setField("phoneNumber", event.target.value)}
                                className="h-12 w-full rounded-xl border border-[#d9e1ec] bg-white px-4 text-[15px] text-[#0b1b33] outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                                placeholder="Phone number"
                              />
                            </div>
                          </Field>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <DateField
                            label="Arrival date in Germany *"
                            value={data.arrivalDate}
                            onChange={(value) => setField("arrivalDate", value)}
                            error={errors.arrivalDate}
                          />
                          <SelectField
                            label="Application type *"
                            value={data.applicationType}
                            onChange={(value) => setField("applicationType", value)}
                            options={APPLICATION_TYPE_OPTIONS}
                            placeholder="Select application type"
                            error={errors.applicationType}
                          />
                        </div>

                        <label className="flex items-start gap-2 text-sm text-[#354867]">
                          <input
                            type="checkbox"
                            checked={data.acceptedTerms}
                            onChange={(event) => setField("acceptedTerms", event.target.checked)}
                            className="mt-0.5 h-4 w-4 rounded border-[#c9d5e7] text-primary focus:ring-primary/20"
                          />
                          <span>
                            You agree to our <span className="text-primary underline">Terms and Conditions</span> and{" "}
                            <span className="text-primary underline">Privacy Policy</span>.
                          </span>
                        </label>
                        {errors.acceptedTerms && <ErrorText>{errors.acceptedTerms}</ErrorText>}
                      </div>
                    )}

                    {currentStep === "uploadDocuments" && (
                      <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-6">
                        <div className="rounded-2xl border border-[#d9e1ec] bg-white p-4 md:p-5">
                          <h3 className="text-[15px] font-semibold text-[#0b1b33]">Passport upload instructions *</h3>
                          <ol className="mt-3 list-decimal pl-4 text-sm leading-6 text-[#44597a] space-y-1">
                            <li>Please upload a clear image of the first page of your passport.</li>
                            <li>Ensure good lighting for better scan accuracy.</li>
                            <li>Once uploaded, the system extracts and fills required fields.</li>
                            <li>Check all extracted details and confirm they match your passport.</li>
                          </ol>

                          <div className="mt-4">
                            <UploadDropZone
                              title={passportFile ? "Click to re-upload" : "Click to upload or drag and drop"}
                              hint="PNG, PDF or JPG (min. 100KB, max. 10MB)"
                              file={passportFile}
                              onFileChange={(file) => onFileChange(file, "passport")}
                              error={errors.passportFile}
                            />
                          </div>

                          {passportPreview && (
                            <div className="mt-4 rounded-xl border border-[#d9e1ec] overflow-hidden bg-[#f8faff]">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={passportPreview} alt="Passport preview" className="w-full max-h-[280px] object-cover" />
                            </div>
                          )}
                        </div>

                        <div className="rounded-2xl border border-[#d9e1ec] bg-white p-4 md:p-5 space-y-4">
                          <InputField
                            label="Birth name *"
                            value={data.birthName}
                            onChange={(value) => setField("birthName", value)}
                            placeholder="Enter birth name"
                            error={errors.birthName}
                          />
                          <InputField
                            label="Passport number *"
                            value={data.passportNumber}
                            onChange={(value) => setField("passportNumber", value)}
                            placeholder="Enter passport number"
                            error={errors.passportNumber}
                          />
                          <DateField
                            label="Birthday *"
                            value={data.birthDate}
                            onChange={(value) => setField("birthDate", value)}
                            error={errors.birthDate}
                          />
                          <DateField
                            label="Passport issue date *"
                            value={data.passportIssueDate}
                            onChange={(value) => setField("passportIssueDate", value)}
                            error={errors.passportIssueDate}
                          />
                          <InputField
                            label="Country of birth *"
                            value={data.countryOfBirth}
                            onChange={(value) => setField("countryOfBirth", value)}
                            placeholder="Country of birth"
                            error={errors.countryOfBirth}
                          />
                          <InputField
                            label="Place of birth *"
                            value={data.placeOfBirth}
                            onChange={(value) => setField("placeOfBirth", value)}
                            placeholder="Place of birth"
                            error={errors.placeOfBirth}
                          />
                          <InputField
                            label="Nationality *"
                            value={data.nationality}
                            onChange={(value) => setField("nationality", value)}
                            placeholder="Nationality"
                            error={errors.nationality}
                          />
                          <InputField
                            label="Place and country of issue of passport *"
                            value={data.passportIssuePlace}
                            onChange={(value) => setField("passportIssuePlace", value)}
                            placeholder="Place and country of issue"
                            error={errors.passportIssuePlace}
                          />
                          <DateField
                            label="Passport expiry date *"
                            value={data.passportExpiryDate}
                            onChange={(value) => setField("passportExpiryDate", value)}
                            error={errors.passportExpiryDate}
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === "faceVerification" && (
                      <div className="rounded-2xl border border-[#d9e1ec] bg-white overflow-hidden">
                        <div className="grid lg:grid-cols-[320px_1fr]">
                          <div className="border-b lg:border-b-0 lg:border-r border-[#e6edf7] bg-[#f8fbff] p-5">
                            <h3 className="text-3xl font-semibold leading-tight text-[#0b1b33]">Help us with Face Verification</h3>
                            <div className="mt-6 space-y-3">
                              <InstructionItem
                                active
                                title="Grant Permissions"
                                description="Allow camera access in your browser."
                                icon={<UserRound size={18} />}
                              />
                              <InstructionItem
                                title="Adjust your position"
                                description="Ensure your face is clearly visible in the frame."
                                icon={<Video size={18} />}
                              />
                              <InstructionItem
                                title="Start Verification"
                                description="Click start to begin a short recording."
                                icon={<Calendar size={18} />}
                              />
                            </div>
                          </div>
                          <div className="p-5 md:p-6">
                            <div className="h-[320px] rounded-2xl border border-[#cfe0f8] bg-[#eaf4ff] flex items-center justify-center text-center px-6">
                              {cameraDenied ? (
                                <p className="text-[#1b3f73] max-w-xl">
                                  Camera permission was denied. Allow camera access in browser settings, then tap Retry.
                                </p>
                              ) : (
                                <p className="text-[#1b3f73]">Camera ready. You can continue after short verification.</p>
                              )}
                            </div>

                            <div className="mt-4 rounded-xl border border-[#f4c5c5] bg-[#fff7f7] px-4 py-3 text-sm text-[#b42318]">
                              {cameraDenied
                                ? "Camera permission denied. Please allow access and tap Retry."
                                : "Face verification completed successfully."}
                            </div>

                            <div className="mt-4 grid sm:grid-cols-2 gap-3">
                              <button
                                type="button"
                                disabled={!cameraDenied}
                                className="h-11 rounded-xl border border-[#d5ddeb] bg-white text-[#0b1b33] font-medium disabled:opacity-60"
                                onClick={() => {
                                  setCameraDenied(false);
                                  setFaceVerified(true);
                                  setErrors((prev) => ({ ...prev, faceVerified: "" }));
                                }}
                              >
                                Retry
                              </button>
                              <button
                                type="button"
                                className="h-11 rounded-xl bg-primary text-white font-medium disabled:opacity-50"
                                disabled={!faceVerified}
                                onClick={() => setFaceVerified(true)}
                              >
                                Start Face Verification
                              </button>
                            </div>

                            {errors.faceVerified && <ErrorText>{errors.faceVerified}</ErrorText>}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === "blockingDetails" && (
                      <div className="grid lg:grid-cols-2 gap-6">
                        <div className="rounded-2xl border border-[#d9e1ec] bg-white p-4 md:p-5">
                          <SelectField
                            label="Document proving eligibility to apply for a visa *"
                            value={data.documentProofType}
                            onChange={(value) => setField("documentProofType", value)}
                            options={VISA_PROOF_OPTIONS}
                            placeholder="Select"
                            error={errors.documentProofType}
                          />

                          <div className="mt-5">
                            <h3 className="text-[15px] font-semibold text-[#0b1b33]">Upload your visa eligibility document *</h3>
                            <ol className="mt-2 list-decimal pl-4 text-sm leading-6 text-[#44597a] space-y-1">
                              <li>A color copy of your document.</li>
                              <li>All four corners of your document should be visible.</li>
                              <li>Please upload only one page containing passport details.</li>
                              <li>All fields should be clearly visible.</li>
                            </ol>
                            <div className="mt-4">
                              <UploadDropZone
                                title={eligibilityFile ? "Click to re-upload" : "Click to upload or drag and drop"}
                                hint="PNG, PDF or JPG (min. 100KB, max. 10MB)"
                                file={eligibilityFile}
                                onFileChange={(file) => onFileChange(file, "eligibility")}
                                error={errors.eligibilityFile}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-[#d9e1ec] bg-white p-4 md:p-5 space-y-4">
                          <SelectField
                            label="Contract duration *"
                            value={data.contractDurationMonths}
                            onChange={(value) => setField("contractDurationMonths", value)}
                            options={CONTRACT_DURATIONS.map((d) => `${d} Months`)}
                            optionValues={CONTRACT_DURATIONS}
                            placeholder="Select contract duration"
                            error={errors.contractDurationMonths}
                          />
                          <InputField
                            label="Blocked amount per month *"
                            value={data.blockedAmountPerMonth}
                            onChange={(value) => setField("blockedAmountPerMonth", value.replace(/[^\d]/g, ""))}
                            placeholder="992"
                            prefix="EUR"
                            error={errors.blockedAmountPerMonth}
                          />
                          <InputField
                            label="One-time setup fee"
                            value={`${SETUP_FEE}`}
                            onChange={() => undefined}
                            prefix="EUR"
                            disabled
                          />
                          <InputField
                            label="Monthly maintenance fee"
                            value={`${MONTHLY_MAINTENANCE_FEE}.00`}
                            onChange={() => undefined}
                            prefix="EUR"
                            disabled
                          />
                          <InputField
                            label="Buffer amount"
                            value={`${BUFFER_AMOUNT}`}
                            onChange={() => undefined}
                            prefix="EUR"
                            disabled
                          />
                          <InputField
                            label="Total deposit amount"
                            value={String(totalBlockedAmount.toFixed(2))}
                            onChange={() => undefined}
                            prefix="EUR"
                            disabled
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === "payers" && (
                      <div className="space-y-5">
                        <div className="rounded-2xl border border-[#d9e1ec] bg-white overflow-hidden">
                          <div className="grid grid-cols-2 md:grid-cols-7 text-xs uppercase tracking-wide text-[#71829f] border-b border-[#e6edf7]">
                            <CellHead>Amount (per month)</CellHead>
                            <CellHead>Blocking period</CellHead>
                            <CellHead>Total amount</CellHead>
                            <CellHead>Setup fee</CellHead>
                            <CellHead>Maintenance fee</CellHead>
                            <CellHead>Buffer amount</CellHead>
                            <CellHead>Total blocked amount</CellHead>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-7 text-sm font-semibold text-[#0b1b33]">
                            <CellBody>{toCurrency(blockedAmount)}</CellBody>
                            <CellBody>{durationMonths}</CellBody>
                            <CellBody>{toCurrency(totalBlockedBase)}</CellBody>
                            <CellBody>{toCurrency(SETUP_FEE)}</CellBody>
                            <CellBody>{toCurrency(maintenanceTotal)}</CellBody>
                            <CellBody>{toCurrency(BUFFER_AMOUNT)}</CellBody>
                            <CellBody>{toCurrency(totalBlockedAmount)}</CellBody>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-[#0b1b33]">Add more payers / sponsors</h3>
                            <p className="text-sm text-[#556786] mt-1">
                              If someone else is depositing into your blocked account, add details below.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={addSponsor}
                            className="inline-flex items-center gap-2 h-10 rounded-xl border border-[#d6deea] px-4 text-sm font-medium text-[#21395f] hover:bg-[#f6f9ff]"
                          >
                            <Plus size={16} />
                            Add payer
                          </button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-3">
                          <InputField
                            label="Sponsor name"
                            value={newSponsorName}
                            onChange={setNewSponsorName}
                            placeholder="Full name"
                          />
                          <InputField
                            label="Relation"
                            value={newSponsorRelation}
                            onChange={setNewSponsorRelation}
                            placeholder="Father, Mother, Sponsor..."
                          />
                          <InputField
                            label="Amount (EUR)"
                            value={newSponsorAmount}
                            onChange={setNewSponsorAmount}
                            placeholder="500.00"
                          />
                        </div>

                        {sponsors.length > 0 && (
                          <div className="rounded-2xl border border-[#d9e1ec] bg-white p-3">
                            {sponsors.map((sponsor) => (
                              <div
                                key={sponsor.id}
                                className="flex items-center justify-between px-3 py-2 border-b border-[#edf2f8] last:border-b-0 text-sm"
                              >
                                <span className="font-medium text-[#0b1b33]">{sponsor.name}</span>
                                <span className="text-[#4f6281]">{sponsor.relation}</span>
                                <span className="font-semibold text-[#0b1b33]">EUR {sponsor.amount}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {currentStep === "review" && (
                      <div className="rounded-2xl border border-[#d9e1ec] bg-white p-5 md:p-6">
                        <p className="text-sm text-[#0a84ae]">
                          Please review your blocked account details carefully before submitting. Inaccuracies may delay processing.
                        </p>

                        <ReviewSection
                          title="Personal information"
                          rows={[
                            ["Title", data.title],
                            ["First names", data.firstName],
                            ["Last name", data.lastName],
                            ["Gender", data.gender],
                            ["Street", data.streetAndHouse],
                            ["Additional address", data.additionalAddress || "-"],
                            ["City", data.city],
                            ["District/State", data.district || "-"],
                            ["Postal code", data.postalCode],
                            ["Country", data.country],
                            ["Arrival date", data.arrivalDate],
                            ["Phone number", `${data.phoneDialCode} ${data.phoneNumber}`],
                            ["E-mail", data.email],
                            ["Visa type", data.applicationType],
                          ]}
                        />

                        <ReviewSection
                          title="Passport information"
                          rows={[
                            ["Birth name", data.birthName],
                            ["Passport number", data.passportNumber],
                            ["Date of birth", data.birthDate],
                            ["Passport issue date", data.passportIssueDate],
                            ["Country of birth", data.countryOfBirth],
                            ["Place of birth", data.placeOfBirth],
                            ["Nationality", data.nationality],
                            ["Place/country of issue", data.passportIssuePlace],
                            ["Passport expiry date", data.passportExpiryDate],
                          ]}
                        />

                        <ReviewSection
                          title="Visa details"
                          rows={[
                            ["Contract duration", `${durationMonths} months`],
                            ["Visa eligibility document", data.documentProofType],
                            ["Blocked amount per month", toCurrency(blockedAmount)],
                            ["Total blocked amount", toCurrency(totalBlockedAmount)],
                          ]}
                        />
                      </div>
                    )}

                    {currentStep === "confirm" && (
                      <div className="rounded-2xl border border-[#d9e1ec] bg-white p-8 text-center">
                        <div className="mx-auto h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center">
                          <Check size={24} />
                        </div>
                        <h3 className="mt-4 text-2xl font-semibold text-[#0b1b33]">Application submitted</h3>
                        <p className="mt-2 text-[#4f6180] max-w-xl mx-auto">
                          Your blocked account application has been received. Our team will verify your details and contact you shortly.
                        </p>
                        <button
                          type="button"
                          className="mt-6 h-11 rounded-xl bg-primary px-6 text-white font-medium"
                          onClick={closeFlow}
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {currentStep !== "confirm" && (
                <div className="border-t border-[#e7ecf3] bg-white px-4 md:px-8 py-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={currentIndex === 0}
                    className="h-11 min-w-[120px] rounded-xl border border-[#d0d9e8] bg-white px-5 text-sm font-medium text-[#22395d] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f7f9fd]"
                  >
                    Back
                  </button>

                  {currentStep === "review" ? (
                    <button
                      type="button"
                      onClick={submitApplication}
                      className="h-11 min-w-[150px] rounded-xl bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-dark transition"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={goNext}
                      className="h-11 min-w-[150px] rounded-xl bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-dark transition"
                    >
                      Further
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#1a2f52]">{label}</label>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  disabled = false,
  prefix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  disabled?: boolean;
  prefix?: string;
}) {
  return (
    <Field label={label} error={error}>
      <div className="relative">
        {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6a7b96] text-sm">{prefix}</span>}
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`h-12 w-full rounded-xl border bg-white text-[15px] text-[#0b1b33] outline-none transition ${
            prefix ? "pl-14 pr-4" : "px-4"
          } ${
            error
              ? "border-[#e19a9a] focus:border-[#c74f4f] focus:ring-4 focus:ring-[#f9dcdc]"
              : "border-[#d9e1ec] focus:border-primary focus:ring-4 focus:ring-primary/10"
          } ${disabled ? "bg-[#f6f8fb] text-[#8b9bb6] cursor-not-allowed" : ""}`}
        />
      </div>
    </Field>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  optionValues,
  placeholder,
  error,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  optionValues?: string[];
  placeholder: string;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <Field label={label} error={error}>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          className={`h-12 w-full appearance-none rounded-xl border bg-white px-4 pr-10 text-[15px] text-[#0b1b33] outline-none transition ${
            error
              ? "border-[#e19a9a] focus:border-[#c74f4f] focus:ring-4 focus:ring-[#f9dcdc]"
              : "border-[#d9e1ec] focus:border-primary focus:ring-4 focus:ring-primary/10"
          } ${disabled ? "bg-[#f6f8fb] text-[#8b9bb6] cursor-not-allowed" : ""}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option key={option} value={optionValues ? optionValues[index] : option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6d7f9b]" />
      </div>
    </Field>
  );
}

function SelectFieldInner({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="relative min-w-[104px]">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-xl border border-[#d9e1ec] bg-white px-3 pr-8 text-sm text-[#0b1b33] outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#6d7f9b]" />
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <Field label={label} error={error}>
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`h-12 w-full rounded-xl border bg-white px-4 pr-10 text-[15px] text-[#0b1b33] outline-none transition ${
            error
              ? "border-[#e19a9a] focus:border-[#c74f4f] focus:ring-4 focus:ring-[#f9dcdc]"
              : "border-[#d9e1ec] focus:border-primary focus:ring-4 focus:ring-primary/10"
          }`}
        />
        <Calendar size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6d7f9b]" />
      </div>
    </Field>
  );
}

function UploadDropZone({
  title,
  hint,
  file,
  onFileChange,
  error,
}: {
  title: string;
  hint: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  error?: string;
}) {
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    onFileChange(selected);
  }

  return (
    <div>
      <label className={`block rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition ${
        error ? "border-[#e19a9a] bg-[#fff9f9]" : "border-[#d7e0ed] bg-[#fafcff] hover:border-primary/50"
      }`}>
        <input
          type="file"
          accept=".png,.jpg,.jpeg,.pdf"
          className="hidden"
          onChange={handleInputChange}
        />
        <div className="mx-auto mb-3 h-10 w-10 rounded-lg border border-[#cfdaea] bg-white flex items-center justify-center text-[#526a90]">
          <Upload size={18} />
        </div>
        <p className="text-base font-medium text-[#102a4f]">{title}</p>
        <p className="text-sm text-[#6c7f9d] mt-1">{hint}</p>
        {file && <p className="mt-2 text-xs text-[#0a5da8]">{file.name}</p>}
      </label>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function InstructionItem({
  title,
  description,
  icon,
  active = false,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  active?: boolean;
}) {
  return (
    <div className={`rounded-xl border p-3 ${active ? "border-primary/40 bg-primary/5" : "border-[#dce5f1] bg-white"}`}>
      <div className="flex items-center gap-3">
        <span className="h-9 w-9 rounded-lg border border-[#c8d7eb] bg-white text-[#234a7e] inline-flex items-center justify-center">
          {icon}
        </span>
        <div>
          <p className="font-medium text-[#0f2950]">{title}</p>
          <p className="text-sm text-[#4f6382]">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewSection({
  title,
  rows,
}: {
  title: string;
  rows: Array<[string, string]>;
}) {
  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold text-[#0b1b33]">{title}</h4>
      <div className="mt-3 grid md:grid-cols-2 gap-x-10 gap-y-2">
        {rows.map(([label, value]) => (
          <div key={`${title}-${label}`} className="grid grid-cols-[180px_1fr] gap-3 text-sm">
            <span className="text-[#7587a3]">{label}</span>
            <span className="text-[#1a3255] font-medium break-words">{value || "-"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CellHead({ children }: { children: ReactNode }) {
  return <div className="p-3 md:p-4 text-center border-r border-[#e6edf7] last:border-r-0">{children}</div>;
}

function CellBody({ children }: { children: ReactNode }) {
  return <div className="p-3 md:p-4 text-center border-r border-[#eef3f9] last:border-r-0">{children}</div>;
}

function ErrorText({ children }: { children: ReactNode }) {
  return <p className="mt-1.5 text-xs text-[#be3f3f]">{children}</p>;
}
