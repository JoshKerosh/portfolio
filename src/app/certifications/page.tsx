import { connectDB } from '@/lib/mongodb'
import { CertificationModel } from '@/models/Certification'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, ExternalLink, Award } from 'lucide-react'
import Link from 'next/link'

async function getCertifications() {
  try {
    await connectDB()
    const certifications = await CertificationModel.find({})
      .sort({ issueDate: -1 })
      .lean()
      .exec()
    return JSON.parse(JSON.stringify(certifications))
  } catch (error) {
    console.error('Error fetching certifications:', error)
    return []
  }
}

export default async function CertificationsPage() {
  const certifications = await getCertifications()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false
    return new Date(expiryDate) < new Date()
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Certifications & Credentials
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications validating my expertise in various technologies and platforms
          </p>
        </div>

        <div className="space-y-6">
          {certifications.map((cert: any) => (
            <Card key={cert.id} className="overflow-hidden">
              <div className="grid md:grid-cols-[200px_1fr] gap-0">
                {/* Image Section */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-6">
                  <div className="text-center">
                    <Award className="h-16 w-16 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">{cert.issuer}</p>
                  </div>
                </div>

                {/* Content Section */}
                <div>
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{cert.name}</CardTitle>
                        <CardDescription className="text-base">
                          {cert.issuer}
                        </CardDescription>
                      </div>
                      {cert.expiryDate && (
                        <Badge
                          variant={isExpired(cert.expiryDate) ? 'destructive' : 'default'}
                        >
                          {isExpired(cert.expiryDate) ? 'Expired' : 'Active'}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{cert.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill: string) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Separator />

                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          <span className="text-muted-foreground">Issued: </span>
                          <span className="font-medium">{formatDate(cert.issueDate)}</span>
                        </span>
                      </div>
                      {cert.expiryDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            <span className="text-muted-foreground">Expires: </span>
                            <span className="font-medium">{formatDate(cert.expiryDate)}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {cert.credentialId && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Credential ID: </span>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {cert.credentialId}
                        </code>
                      </div>
                    )}

                    {cert.credentialUrl && (
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Verify Credential
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}

          {certifications.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No certifications available yet. Check back soon!
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Why Certifications Matter</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              Professional certifications demonstrate commitment to continuous learning and
              validate expertise in specific technologies. Each certification represents
              hours of study, hands-on practice, and successfully passing rigorous examinations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
