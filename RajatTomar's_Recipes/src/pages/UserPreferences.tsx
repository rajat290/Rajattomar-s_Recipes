import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { getUserPreferences, saveUserPreferences, UserPreferences } from '@/services/preferences';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  dietaryPreferences: z.array(z.string()),
  allergies: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

const dietOptions = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'keto', label: 'Keto' },
  { value: 'gluten-free', label: 'Gluten Free' },
  { value: 'dairy-free', label: 'Dairy Free' },
];

const allergyOptions = [
  { value: 'dairy', label: 'Dairy' },
  { value: 'egg', label: 'Egg' },
  { value: 'gluten', label: 'Gluten' },
  { value: 'peanut', label: 'Peanut' },
  { value: 'seafood', label: 'Seafood' },
  { value: 'shellfish', label: 'Shellfish' },
  { value: 'soy', label: 'Soy' },
  { value: 'wheat', label: 'Wheat' },
  { value: 'tree-nut', label: 'Tree Nuts' },
];

const UserPreferencesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dietaryPreferences: [],
      allergies: [],
    },
  });
  
  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
      return;
    }
    
    // Load user preferences
    const loadPreferences = async () => {
      setLoading(true);
      try {
        const preferences = await getUserPreferences(user.id);
        if (preferences) {
          form.reset({
            dietaryPreferences: preferences.dietaryPreferences || [],
            allergies: preferences.allergies || [],
          });
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPreferences();
  }, [user, navigate, form]);
  
  const onSubmit = async (values: FormValues) => {
    if (!user) return;
    
    try {
      await saveUserPreferences({
        userId: user.id,
        dietaryPreferences: values.dietaryPreferences,
        allergies: values.allergies,
        favoriteRecipes: [],
        savedRecipes: [],
      });
      
      toast({
        title: 'Preferences Saved',
        description: 'Your dietary preferences and allergies have been saved',
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: 'Error',
        description: 'Failed to save preferences',
        variant: 'destructive',
      });
    }
  };
  
  if (!user) {
    return null; // Will redirect to sign-in
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link 
            to="/profile" 
            className="inline-flex items-center text-food-medium-gray hover:text-food-green mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Profile
          </Link>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-heading text-2xl font-semibold">Dietary Preferences</h1>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <p className="text-food-medium-gray">Loading preferences...</p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="dietaryPreferences"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-lg">Diet Preferences</FormLabel>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {dietOptions.map((option) => (
                            <FormField
                              key={option.value}
                              control={form.control}
                              name="dietaryPreferences"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option.value}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.value)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.value])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== option.value
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                  <FormField
                    control={form.control}
                    name="allergies"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-lg">Food Allergies</FormLabel>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {allergyOptions.map((option) => (
                            <FormField
                              key={option.value}
                              control={form.control}
                              name="allergies"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option.value}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.value)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, option.value])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== option.value
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                  <Button type="submit" className="bg-food-green hover:bg-food-green/90">
                    <Save size={16} className="mr-2" />
                    Save Preferences
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserPreferencesPage;
