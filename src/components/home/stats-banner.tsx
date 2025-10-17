'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Users, Zap, CheckCircle } from 'lucide-react';

export function StatsBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  const [stats, setStats] = useState({
    tasks: 0,
    users: 0,
    satisfaction: 0,
    uptime: 0
  });

  const targetStats = {
    tasks: 12847,
    users: 10234,
    satisfaction: 98,
    uptime: 99.9
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');

      // Animate counters
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;

        setStats({
          tasks: Math.floor(targetStats.tasks * progress),
          users: Math.floor(targetStats.users * progress),
          satisfaction: Math.floor(targetStats.satisfaction * progress),
          uptime: parseFloat((targetStats.uptime * progress).toFixed(1))
        });

        if (step >= steps) {
          clearInterval(timer);
          setStats(targetStats);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView, controls]);

  const statsData = [
    {
      icon: <Zap className="h-6 w-6" />,
      value: stats.tasks.toLocaleString(),
      label: 'Tasks Completed',
      suffix: '+',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Users className="h-6 w-6" />,
      value: stats.users.toLocaleString(),
      label: 'Active Users',
      suffix: '+',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      value: stats.satisfaction,
      label: 'Satisfaction Rate',
      suffix: '%',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: stats.uptime,
      label: 'Uptime',
      suffix: '%',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section ref={ref} className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Animated Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-muted/50 hover:border-purple-500/30 transition-all duration-300">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>

                {/* Value */}
                <div className="mb-2">
                  <span className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </span>
                  <span className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <p className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              </div>

              {/* Floating Particles */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
                className="absolute -top-2 -right-2 w-2 h-2 bg-purple-500 rounded-full blur-sm"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Text Below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground">
            Trusted by <span className="font-bold text-foreground">500+ businesses</span> worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}
