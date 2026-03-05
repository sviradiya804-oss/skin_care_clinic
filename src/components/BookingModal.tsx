import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const services = [
  "HydraFacial",
  "Chemical Peel",
  "Laser Hair Removal",
  "Microneedling",
  "Anti-Aging Treatment",
  "Acne Therapy"
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

export const BookingModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-cream w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-5 h-full min-h-[500px]">
          <div className="md:col-span-2 bg-ink p-8 text-cream flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-serif mb-4">Book Your Glow</h3>
              <p className="text-cream/60 text-sm leading-relaxed">
                Experience the pinnacle of skincare at Seema Clinic. Your journey to radiant skin begins here.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className={cn("w-2 h-2 rounded-full", step >= 1 ? "bg-gold" : "bg-cream/20")} />
                <span className={step >= 1 ? "text-cream" : "text-cream/40"}>Select Service</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className={cn("w-2 h-2 rounded-full", step >= 2 ? "bg-gold" : "bg-cream/20")} />
                <span className={step >= 2 ? "text-cream" : "text-cream/40"}>Date & Time</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className={cn("w-2 h-2 rounded-full", step >= 3 ? "bg-gold" : "bg-cream/20")} />
                <span className={step >= 3 ? "text-cream" : "text-cream/40"}>Personal Details</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 p-8">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-serif">Appointment Confirmed!</h4>
                  <p className="text-ink/60 text-sm">
                    We've sent a confirmation email to {formData.email}. See you soon at Seema Clinic!
                  </p>
                  <button 
                    onClick={onClose}
                    className="mt-6 px-8 py-3 bg-ink text-cream rounded-full hover:bg-ink/90 transition-all"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col">
                  {step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h4 className="text-xl font-serif">What treatment are you looking for?</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {services.map(service => (
                          <button
                            key={service}
                            onClick={() => {
                              setFormData({ ...formData, service });
                              handleNext();
                            }}
                            className={cn(
                              "w-full p-4 text-left rounded-xl border transition-all hover:border-gold",
                              formData.service === service ? "border-gold bg-gold/5" : "border-ink/10"
                            )}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h4 className="text-xl font-serif">When would you like to visit?</h4>
                      <div className="space-y-4">
                        <input 
                          type="date" 
                          className="w-full p-4 rounded-xl border border-ink/10 focus:border-gold outline-none"
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map(time => (
                            <button
                              key={time}
                              onClick={() => setFormData({ ...formData, time })}
                              className={cn(
                                "p-3 text-sm rounded-lg border transition-all",
                                formData.time === time ? "border-gold bg-gold/5" : "border-ink/10 hover:border-gold"
                              )}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button onClick={handleBack} className="flex-1 p-4 border border-ink/10 rounded-xl">Back</button>
                        <button 
                          onClick={handleNext} 
                          disabled={!formData.date || !formData.time}
                          className="flex-1 p-4 bg-ink text-cream rounded-xl disabled:opacity-50"
                        >
                          Continue
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h4 className="text-xl font-serif">Almost there...</h4>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                          <input 
                            required
                            placeholder="Full Name"
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-ink/10 focus:border-gold outline-none"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                          <input 
                            required
                            type="email"
                            placeholder="Email Address"
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-ink/10 focus:border-gold outline-none"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/40" />
                          <input 
                            required
                            placeholder="Phone Number"
                            className="w-full pl-12 pr-4 py-4 rounded-xl border border-ink/10 focus:border-gold outline-none"
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                        <div className="flex gap-3 pt-4">
                          <button type="button" onClick={handleBack} className="flex-1 p-4 border border-ink/10 rounded-xl">Back</button>
                          <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 p-4 bg-gold text-ink font-semibold rounded-xl disabled:opacity-50 flex items-center justify-center"
                          >
                            {isSubmitting ? "Booking..." : "Confirm Booking"}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
