import {
    AlertTriangle,
    Baby,
    Banknote,
    Bed,
    Book,
    BookOpen,
    Briefcase,
    Calendar,
    Car,
    Circle,
    ClipboardList,
    Coffee,
    CreditCard,
    DollarSign,
    Dumbbell,
    Eye,
    FileText,
    Film,
    Gamepad,
    Gift,
    HandHeart,
    Heart,
    Home,
    LineChart,
    Map,
    MoreHorizontal,
    PiggyBank,
    PlusCircle,
    Puzzle,
    RotateCw,
    Scissors,
    Shield,
    ShoppingCart,
    Smartphone,
    Stethoscope,
    Train,
    Tv,
    Truck,
    User,
    Utensils,
    Wrench,
    Zap,
    LucideProps,
    Pill,
    Smile,
    Plane,
    Shirt,
    Sofa,
  } from "lucide-react";
  
  export interface Subcategory {
    name: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    type: CategoryType;
  }
  
  export interface Category {
    category: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    type: CategoryType;
    subcategories: Subcategory[];
  }

  export enum CategoryType {
    INCOME = 'income',
    EXPENSE = 'expense',
    BOTH = 'both',
  }
  
  export const categories: Category[] = [
    {
      category: "Earnings",
      icon: DollarSign,
      type: CategoryType.INCOME,
      subcategories: [
        { name: "Salary/Wages", icon: DollarSign, type: CategoryType.INCOME },
        { name: "Bonuses", icon: Gift, type: CategoryType.INCOME },
        { name: "Business Income", icon: Briefcase, type: CategoryType.INCOME },
        { name: "Investments", icon: LineChart, type: CategoryType.INCOME },
        { name: "Rental Income", icon: Home, type: CategoryType.INCOME },
        { name: "Freelance/Consulting", icon: FileText, type: CategoryType.INCOME },
        { name: "Government Benefits", icon: Banknote, type: CategoryType.INCOME },
        { name: "Gifts", icon: Gift, type: CategoryType.INCOME },
        { name: "Refunds", icon: RotateCw, type: CategoryType.INCOME },
        { name: "Other Income", icon: PlusCircle, type: CategoryType.INCOME }
      ]
    },
    {
      category: "Housing",
      icon: Home,
      type: CategoryType.EXPENSE,
      subcategories: [
        { name: "Rent", icon: Home, type: CategoryType.EXPENSE },
        { name: "Mortgage", icon: FileText, type: CategoryType.EXPENSE },
        { name: "Utilities", icon: Zap, type: CategoryType.EXPENSE },
        { name: "Home Maintenance", icon: Wrench, type: CategoryType.EXPENSE }
      ]
    },
    {
      category: "Transportation",
      icon: Car,
      type: CategoryType.EXPENSE,
      subcategories: [
        { name: "Fuel", icon: Truck, type: CategoryType.EXPENSE },
        { name: "Car Payment", icon: Car, type: CategoryType.EXPENSE },
        { name: "Maintenance/Repairs", icon: Wrench, type: CategoryType.EXPENSE },
        { name: "Public Transportation", icon: Train, type: CategoryType.EXPENSE },
        { name: "Insurance", icon: Shield, type: CategoryType.EXPENSE }
      ]
    },
    {
      category: "Food & Groceries",
      icon: ShoppingCart,
      type: CategoryType.EXPENSE,
      subcategories: [
        { name: "Groceries", icon: ShoppingCart, type: CategoryType.EXPENSE },
        { name: "Dining Out", icon: Coffee, type: CategoryType.EXPENSE },
        { name: "Delivery", icon: Truck, type: CategoryType.EXPENSE }
      ]
    },
    {
      category: "Healthcare",
      icon: Heart,
      type: CategoryType.EXPENSE,
      subcategories: [
        { name: "Health Insurance", icon: Heart, type: CategoryType.EXPENSE },
        { name: "Medication", icon: Pill, type: CategoryType.EXPENSE },
        { name: "Doctor Visits", icon: Stethoscope, type: CategoryType.EXPENSE },
        { name: "Dental", icon: Smile, type: CategoryType.EXPENSE },
        { name: "Vision", icon: Eye, type: CategoryType.EXPENSE }
      ]
    },
    {
      category: "Debt Repayment",
      icon: CreditCard,
      type: CategoryType.EXPENSE,
      subcategories: [
        { name: "Credit Card Payments", icon: CreditCard, type: CategoryType.EXPENSE },
        { name: "Student Loans", icon: BookOpen, type: CategoryType.EXPENSE },
        { name: "Personal Loans", icon: DollarSign, type: CategoryType.EXPENSE }
      ]
    },
    {
      category: "Insurance",
      icon: Shield,
      type: CategoryType.EXPENSE,
      subcategories: [
        { name: "Life Insurance", icon: Shield, type: CategoryType.EXPENSE },
        { name: "Home Insurance", icon: Home, type: CategoryType.EXPENSE }
      ]
    },
    {
      category: "Entertainment",
      icon: Tv,
      type: CategoryType.EXPENSE,
      subcategories: [
        { name: "Streaming Services", icon: Tv, type: CategoryType.EXPENSE },
        { name: "Movies/Theater", icon: Film, type: CategoryType.EXPENSE },
        { name: "Gaming", icon: Gamepad, type: CategoryType.EXPENSE }
      ]
    },
    {
      category: "Travel",
      icon: Plane,
      type: CategoryType.EXPENSE,
      subcategories: [
        { name: "Flights", icon: Plane, type: CategoryType.EXPENSE },
        { name: "Accommodation", icon: Bed, type: CategoryType.EXPENSE },
        { name: "Food & Activities", icon: Utensils, type: CategoryType.EXPENSE }
      ]
    },
    {
      category: "Shopping",
      icon: ShoppingCart,
      type: CategoryType.EXPENSE,
      subcategories: [
        { name: "Clothing", icon: Shirt, type: CategoryType.EXPENSE },
        { name: "Electronics", icon: Smartphone, type: CategoryType.EXPENSE },
        { name: "Furniture", icon: Sofa, type: CategoryType.EXPENSE },
        { name: "Hobbies", icon: Puzzle, type: CategoryType.EXPENSE }
      ]
    },
    {
      category: "Personal Care",
      icon: Scissors,
      type: CategoryType.EXPENSE,
      subcategories: [
        { name: "Hair/Beauty", icon: Scissors, type: CategoryType.EXPENSE },
        { name: "Fitness", icon: Dumbbell, type: CategoryType.EXPENSE },
        { name: "Wellness", icon: HandHeart, type: CategoryType.EXPENSE }
      ]
    },
    {
      category: "Savings & Investments",
      icon: PiggyBank,
      type: CategoryType.BOTH,
      subcategories: [
        { name: "Savings", icon: PiggyBank, type: CategoryType.BOTH },
        { name: "Emergency Fund", icon: AlertTriangle, type: CategoryType.BOTH },
        { name: "Retirement", icon: Calendar, type: CategoryType.BOTH },
        { name: "Investment Contributions", icon: LineChart, type: CategoryType.BOTH }
      ]
    },
    {
      category: "Fees & Charges",
      icon: DollarSign,
      type: CategoryType.EXPENSE,
      subcategories: [
        { name: "Bank Fees", icon: DollarSign, type: CategoryType.EXPENSE },
        { name: "ATM Fees", icon: CreditCard, type: CategoryType.EXPENSE },
        { name: "Credit Card Fees", icon: AlertTriangle, type: CategoryType.EXPENSE }
      ]
    },
    {
      category: "Gifts & Donations",
      icon: Gift,
      type: CategoryType.BOTH,
      subcategories: [
        { name: "Charity", icon: HandHeart, type: CategoryType.EXPENSE },
        { name: "Gifts", icon: Gift, type: CategoryType.BOTH }
      ]
    },
    {
      category: "Education",
      icon: BookOpen,
      type: CategoryType.EXPENSE,
      subcategories: [
        { name: "Tuition", icon: Book, type: CategoryType.EXPENSE },
        { name: "Books & Supplies", icon: BookOpen, type: CategoryType.EXPENSE },
        { name: "Courses/Workshops", icon: ClipboardList, type: CategoryType.EXPENSE }
      ]
    },
    {
      category: "Childcare",
      icon: User,
      type: CategoryType.EXPENSE,
      subcategories: [
        { name: "Daycare", icon: Baby, type: CategoryType.EXPENSE },
        { name: "Babysitting", icon: User, type: CategoryType.EXPENSE },
        { name: "School Activities", icon: Briefcase, type: CategoryType.EXPENSE }
      ]
    },
    {
      category: "Miscellaneous",
      icon: MoreHorizontal,
      type: CategoryType.EXPENSE,
      subcategories: [
        { name: "Other", icon: Circle, type: CategoryType.EXPENSE },
        { name: "Unexpected Expenses", icon: AlertTriangle, type: CategoryType.EXPENSE }
      ]
    }
  ];
  