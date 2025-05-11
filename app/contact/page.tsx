"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { useTranslation } from "@/components/language-provider"

export default function ContactPage() {
  const { language } = useAppStore()
  const { t } = useTranslation()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
    subscribe: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "general",
        message: "",
        subscribe: false,
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">{t("contact.title")}</h1>
        <p className="text-xl text-muted-foreground mb-12">
          {t("contact.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {isSubmitted ? (
              <Card className="p-8 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <Send className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{t("contact.success.title")}</h2>
                <p className="text-muted-foreground mb-6">
                  {t("contact.success.message")}
                </p>
                <Button onClick={() => setIsSubmitted(false)}>{t("contact.form.sendAnother")}</Button>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("contact.form.name")}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={t("contact.form.namePlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contact.form.email")}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t("contact.form.emailPlaceholder")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t("contact.form.subject")}</Label>
                  <RadioGroup
                    value={formData.subject}
                    onValueChange={handleRadioChange}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="general" id="general" />
                      <Label htmlFor="general">{t("contact.form.subjects.general")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="membership" id="membership" />
                      <Label htmlFor="membership">{t("contact.form.subjects.membership")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="events" id="events" />
                      <Label htmlFor="events">{t("contact.form.subjects.events")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="partnership" id="partnership" />
                      <Label htmlFor="partnership">{t("contact.form.subjects.partnership")}</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.form.message")}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    required
                    placeholder={t("contact.form.messagePlaceholder")}
                    rows={6}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="subscribe"
                    name="subscribe"
                    checked={formData.subscribe}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, subscribe: checked === true }))}
                  />
                  <Label htmlFor="subscribe" className="text-sm">
                    {t("contact.form.subscribe")}
                  </Label>
                </div>

                <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
                </Button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">{t("contact.contactInfo.email")}</h3>
                  <p className="text-sm text-muted-foreground">
                    <a href="mailto:contact@happyhacking.space">contact at happyhacking dot space</a>
                  </p>
                </div>
              </div>
            </Card>

            {/* <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">{t("contact.contactInfo.phone")}</h3>
                  <p className="text-sm text-muted-foreground">+90 212 555 1234</p>
                </div>
              </div>
            </Card> */}

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">{t("contact.contactInfo.location")}</h3>
                  <p className="text-sm text-muted-foreground">
                    Diyarbakir
                    <br />
                    Turkiye
                  </p>
                </div>
              </div>
            </Card>

            <div className="aspect-video relative rounded-lg overflow-hidden">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62880.91729943176!2d40.12147848132254!3d37.92285297637394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40751fa80abac46b%3A0x53070c279310852c!2zRGl5YXJiYWvEsXIsIFTDvHJraXll!5e1!3m2!1sen!2sbe!4v1746956233506!5m2!1sen!2sbe${language === "tr" ? "tr" : "en"}!2str!4v1620000000000!5m2!1s${language === "tr" ? "tr" : "en"}!2str`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Happy Hacking Space Location"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
