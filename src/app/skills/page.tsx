import { connectDB } from '@/lib/mongodb'
import { SkillModel } from '@/models/Skill'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

async function getSkills() {
  try {
    await connectDB()
    const skills = await SkillModel.find({}).lean().exec()
    return JSON.parse(JSON.stringify(skills))
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}

export default async function SkillsPage() {
  const skills = await getSkills()
  
  const categories = [
    'All',
    'Frontend',
    'Backend',
    'Database',
    'DevOps',
    'Tools',
    'Languages',
  ]

  const getSkillsByCategory = (category: string) => {
    if (category === 'All') return skills
    return skills.filter((skill: any) => skill.category === category)
  }

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'bg-green-500'
    if (level >= 75) return 'bg-blue-500'
    if (level >= 60) return 'bg-yellow-500'
    return 'bg-gray-500'
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Skills & Technologies</h1>
          <p className="text-lg text-muted-foreground">
            My technical expertise and proficiency across various technologies
          </p>
        </div>

        <Tabs defaultValue="All" className="w-full">
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {getSkillsByCategory(category).map((skill: any) => (
                  <Card key={skill.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{skill.name}</CardTitle>
                        {skill.featured && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {skill.category}
                        {skill.yearsOfExperience && (
                          <> · {skill.yearsOfExperience} years</>
                        )}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Proficiency</span>
                          <span className="font-semibold">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${getSkillColor(
                              skill.level
                            )}`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {getSkillsByCategory(category).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No skills found in this category yet.
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Skill Level Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span className="text-sm">Expert (90-100%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500" />
                <span className="text-sm">Advanced (75-89%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500" />
                <span className="text-sm">Intermediate (60-74%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-500" />
                <span className="text-sm">Beginner (0-59%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
